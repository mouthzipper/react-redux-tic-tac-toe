import Constants from '../constants/Constants';

export class GridComputer {
    constructor (grid, player) {
        this.bestChoise = null;
        this.minimax(grid, player, 0);
        return this.bestChoise;
    }

    minimax (grid, player, depth) {
        let winnerResult = GetWinner(grid);

        if (winnerResult !== Constants.PLAYER._) {
            return this.getScore(winnerResult, player, depth);
        }

        if (IsFull(grid)) {
            return 0;
        }

        let availableMoves = this.getFreePositions(grid);
        let stack = [];
        let oppositePlayer = this.getOppositePlayer(player);
        
        availableMoves.forEach((move) => {
            let clonedGrid = grid.set(move, player);
            let result = this.minimax(clonedGrid, oppositePlayer, depth + 1);

            stack.push(result);
        });

        let result = stack[0];
        let optimalMove = availableMoves[0];

        for (let i = 1; i < stack.length; i++) {
            if ((stack[i] > result && player === Constants.PLAYER.O) ||
             (stack[i] < result && player === Constants.PLAYER.X)) {
                result = stack[i];
                optimalMove = availableMoves[i];
            }
        }

        if (depth === 0 && player === Constants.PLAYER.O) {
            this.bestChoise = optimalMove;
        }

        return result;
    }

    getScore (result, player, depth) {
        if (result === Constants.PLAYER.O) {
            return 10 - depth;
        } else if (result === Constants.PLAYER._) {
            return 0;
        }

        return depth - 10;
    }

    getFreePositions (grid) {
        let stack = [];

        for (let i = 0; i < grid.count(); i++) {
            if (grid.get(i) === Constants.PLAYER._) {
                stack.push(i);
            }
        }

        return stack;
    }

    getOppositePlayer(player) {
        return player === Constants.PLAYER.O ? Constants.PLAYER.X : Constants.PLAYER.O;
    }
}

export function IsFull (grid) {
    return grid.indexOf(Constants.PLAYER._) === -1;
}

export function GetWinner (grid) {
    // temporary , works only for 3x3
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (grid.get(a) && grid.get(a) === grid.get(b) && grid.get(a) === grid.get(c) &&
         grid.get(a) !== Constants.PLAYER._) {
        return grid.get(a);
        }
    }

    return Constants.PLAYER._;
}
