import React from 'react';
import Constants from '../../constants/Constants';

class Cell extends React.Component {


    shouldComponentUpdate (nextProps) {
        return this.props.value !== nextProps.value;
    }

    handleClick () {
        this.props.onSelectCell();
    }

    render () {
        let boxSymbol = <span />;

        if (this.props.value === Constants.PLAYER.X) {
            boxSymbol = (<span className="glyphicon glyphicon-remove"></span>);
        }

        if (this.props.value === Constants.PLAYER.O) {
            boxSymbol = (<span className="glyphicon glyphicon-record"></span>);
        }

        return (
            <div className="cell" onClick={this.handleClick.bind(this)}>
                {boxSymbol}
            </div>
        );
    }
}

Cell.propTypes = {
    value: React.PropTypes.oneOf([
        Constants.PLAYER._,
        Constants.PLAYER.X,
        Constants.PLAYER.O
    ]).isRequired,
    onSelectCell: React.PropTypes.func.isRequired
};

export default Cell;