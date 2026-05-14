import { Character } from "./Character";
import { Player } from "./Player";
import { Team } from "./Team";

export class Game {
    private _player1: Player;
    private _player2: Player;
    private _torn: number;

    private static ALL_CHARACTERS: { name: string, hp: number, attackPower: number, defense: number, img: string }[] = [
        { name: "Arquero", hp: 80, attackPower: 20, defense: 5, img: "src/img/arquero.png" },
        { name: "Berserker", hp: 90, attackPower: 22, defense: 3, img: "src/img/berserker.png" },
        { name: "Caballero", hp: 110, attackPower: 15, defense: 12, img: "src/img/caballero.png" },
        { name: "Clerigo", hp: 75, attackPower: 12, defense: 8, img: "src/img/clerigo.png" },
        { name: "Mag", hp: 70, attackPower: 25, defense: 3, img: "src/img/mago.png" },
    ];

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

    get torn(): number {
        return this._torn;
    }

    set torn(newTurn: number) {
        this._torn = newTurn;
    }

    // METODES

    // Per retornar els 3 personatges agafats a l'atzar dels 5 possibles
    private pickRandomCharacters(): Character[] {
        const barrejats = [...Game.ALL_CHARACTERS];
        for (let i = barrejats.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = barrejats[i];
            barrejats[i] = barrejats[j];
            barrejats[j] = temp;
        }
        const seleccionats = barrejats.slice(0, 3);
        return seleccionats.map(c => new Character(c.name, c.hp, c.attackPower, c.defense, c.img));
    }

    public start(): void {
        const chars1 = this.pickRandomCharacters();
        const chars2 = this.pickRandomCharacters();

        chars1.forEach(c => this._player1.team.addCharacter(c));
        chars2.forEach(c => this._player2.team.addCharacter(c));

        this._torn = 1;
    }

    public restart(): void {
        this._player1 = new Player(new Team());
        this._player2 = new Player(new Team());
        this.start();
    }

    // Per retornar el primer personatge viu d'un jugador
    public getActiveCharacter(player: Player): Character | undefined {
        return player.team.characters.find(c => c.isAlive());
    }

    // Per retornar el jugador que ataca aquest torn
    public getCurrentPlayer(): Player {
        if (this._torn === 1) {
            return this._player1;
        } else {
            return this._player2;
        }
    }

    // Per retornar el jugador que rep l'atac
    public getDefendingPlayer(): Player {
        if (this._torn === 1) {
            return this._player2;
        } else {
            return this._player1;
        }
    }

    public attack(): { qui: string, atacant: string, defensor: string, hpRestant: number } {
        const atacant = this.getActiveCharacter(this.getCurrentPlayer());
        const defensor = this.getActiveCharacter(this.getDefendingPlayer());
        const qui = this._torn === 1 ? "Jugador" : "Màquina";

        atacant!.attack(defensor!);

        // Per canviar el torn
        if (this._torn === 1) {
            this._torn = 2;
        } else {
            this._torn = 1;
        }

        return {
            qui: qui,
            atacant: atacant!.name,
            defensor: defensor!.name,
            hpRestant: defensor!.hp
        };
    }

    public isOver(): boolean {
        const team1Alive = this._player1.team.characters.some(c => c.isAlive());
        const team2Alive = this._player2.team.characters.some(c => c.isAlive());
        return !team1Alive || !team2Alive;
    }

    public getWinner(): Player | undefined {
        const team1Alive = this._player1.team.characters.some(c => c.isAlive());
        if (team1Alive) {
            return this._player1;
        } else {
            return this._player2;
        }
    }
}

