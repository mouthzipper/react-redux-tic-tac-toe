import Immutable from 'immutable';
import Constants from '../constants/Constants';

function getInitialState () {
    return Immutable.fromJS({
        grid: [...Array(9)].map(() => Constants.PLAYER._),
        outcome: Constants.STATE.ONGOING
    });
}

export default function TicTacToeReducer (state = getInitialState(), action) {
      switch (action.type) {
        case Constants.MAKE_MOVE:
            return state.set('outcome', action.outcome).set('grid', action.grid);

        case Constants.NEW_GAME:
            return getInitialState();

        default:
              return state;
      }
}