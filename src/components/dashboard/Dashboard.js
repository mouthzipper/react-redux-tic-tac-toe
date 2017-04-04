import React from 'react';
import Constants from '../../constants/Constants';

class Dashboard extends React.Component {

    handleRestart() {
        this.props.onRestart();
    }

    render() {
        let {outcome} = this.props;

        if (outcome === Constants.STATE.ONGOING) {
            return null;
        }

        let message = 'It is a tie!';
        if (outcome === Constants.PLAYER.O) {
            message = 'You lost!';
        } else if (outcome === Constants.PLAYER.X) {
            message = 'You won!';
        }

        return (
            <div className="mask">
                <div className="mask-centered-text">
                    <div className="animated fadeInDown">
                        {message}
                    </div>

                    <button
                    onClick={this.handleRestart.bind(this)}
                     className="btn btn-success btn-lg">
                        Restart!
                    </button>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    outcome: React.PropTypes.oneOf([
        Constants.PLAYER.X,
        Constants.PLAYER.O,
        Constants.STATE.TIE,
        Constants.STATE.ONGOING
    ]),
    onRestart: React.PropTypes.func.isRequired
};

export default Dashboard;