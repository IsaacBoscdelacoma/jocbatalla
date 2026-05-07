import { Team } from "./Team";

export class Player {
    private _team: Team;

    constructor(team: Team) {
        this._team = team;
    }

    // GETTERS I SETTERS

    get team(): Team {
        return this._team;
    }

    set team(newTeam: Team) {
        this._team = newTeam;
    }

}