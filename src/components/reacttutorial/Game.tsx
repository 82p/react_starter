import * as React from "react";
import { Boad } from "./Boad";


export interface BordState {
    squares: string[],
}

export interface GameState {
    history: BordState[],
    xIsNext: boolean,
    stepNumber: number,
}
/**
 * Game class
 */
export class Game extends React.Component<undefined, GameState>{
    constructor() {
        super();
        this.reset();
    }
    /**funtion when square is clicked */
    public handleClick(i: number): void {
        // const history = this.state.history.slice(0,this.state.stepNumber);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = this.state.history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(current.squares);

        if (calculateWinner(current.squares) || current.squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{ squares: squares }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: this.state.stepNumber + 1,
        });
    }
    /**jump to history*/
    public jumpTo(step: number): void {
        if (step === 0) {
            this.reset();
        }
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        })
    }
    /**reset game */
    private reset(): void {
        const nullarr: Array<string> = new Array(9);
        this.setState({
            history: [{ squares: nullarr }],
            xIsNext: true,
            stepNumber: 0,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner :' + winner;
        } else if (current.squares.filter((x) => x !== null).length === 9) {
            status = "Draw";
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        const moves = history.map((bs, num) => {
            const desc = num ? "Move #" + num : "Game Start";
            return (
                <li>
                    <a href="#" onClick={() => this.jumpTo(num)}>{desc}</a>
                </li>
            );
        })
        return (
            <div className="game">
                <div className="game-board">
                    <Boad squares={current.squares} onClick={(i: number) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}