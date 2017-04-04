import { GridComputer, GetWinner, IsFull } from '../logic/GridComputer';
import Constants from '../constants/Constants';
import * as types from './actionTypes';

function calculateOutcome (grid) {
    let currentWinner = GetWinner(grid);

    if (currentWinner !== Constants.PLAYER._) {
        return currentWinner;
    }

    if (IsFull(grid)) {
        return Constants.STATE.TIE;
    }

    return Constants.STATE.ONGOING;
}

export function makeMove (index) {
      return (dispatch, getState) => {
        let grid = getState().get('grid'),
            outcome;
        console.log(grid);
        console.log(outcome)
        if (grid.get(index) !== Constants.PLAYER._) {
            return;
        }

        grid = grid.set(index, Constants.PLAYER.X);

        outcome = calculateOutcome(grid);
        if (outcome !== Constants.STATE.ONGOING) {
            return dispatch({
                type: types.MAKE_MOVE,
                outcome,
                grid
              });
        }

        let { bestChoise } = new GridComputer(grid, Constants.PLAYER.O);
        grid = grid.set(bestChoise, Constants.PLAYER.O);

        outcome = calculateOutcome(grid);
        return dispatch({
            type: types.MAKE_MOVE,
            outcome,
            grid
        });
      };
}


export function newGame () {
    return {
        type: types.NEW_GAME
    };
}