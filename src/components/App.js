import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/ticTacToeActions';

import Cell from './cell/Cell';
import Dashboard from './dashboard/Dashboard';

class App extends React.Component {

    shouldComponentUpdate (nextProps) {
        return this.props.grid !== nextProps.grid;
    }

    handleClickCell (index) {
        this.props.makeMove(index);
    }

    handleRestart () {
        this.props.newGame();
    }

    render() {
        let cellContainer = this.props.grid.map((cell, i) => {
            return <Cell key={i} value={cell} onSelectCell={this.handleClickCell.bind(this, i)} />;
        });

        return (
            <div className="cell-wrapper">
                <Dashboard outcome={this.props.outcome} onRestart={this.handleRestart.bind(this)} />
                <div className="cell-container">
                    {cellContainer}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    grid: React.PropTypes.object.isRequired,
    outcome: React.PropTypes.string.isRequired,
    newGame: React.PropTypes.func.isRequired,
    makeMove: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        grid: state.get('grid'),
        outcome: state.get('outcome')
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
