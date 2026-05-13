import { Character } from "./Character";
import { Player } from "./Player";
import { Team } from "./Team";

export class Game {
    private _player1: Player;
    private _player2: Player;
    private _torn: number;

    constructor() {
        this._player1 = new Player(new Team());
        this._player2 = new Player(new Team());
        this._torn = 1;
    }

    get player1(): Player {
        return this._player1;
    }

    set player1(newPlayer: Player) {
        this._player1 = newPlayer;
    }

    get player2(): Player {
        return this._player2;
    }

    set player2(newPlayer: Player) {
        this._player2 = newPlayer;
    }

    get currentTurn(): number {
        return this._torn;
    }

    set currentTurn(newTurn: number) {
        this._torn = newTurn;
    }
}

