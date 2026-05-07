import { Character } from "./Character";

export class Team {
    private _characters: Character[];

    constructor() {
        this._characters = [];
    }

    // GETTERS I SETTERS

    get characters(): Character[] {
        return this._characters;
    }

    set characters(newCharacters: Character[]) {
        this._characters = newCharacters;
    }

    // METODES

    public addCharacter(character: Character): void {
        this._characters.push(character);
    }

}