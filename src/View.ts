import type { Character } from "./model/Character";
import type { Player } from "./model/Player";
import type { Game } from "./model/Game";

export class View {
    // Zones de jugadors
    private _divPlayer1: HTMLDivElement;
    private _divPlayer2: HTMLDivElement;

    // Info de torn
    private _divTurnInfo: HTMLDivElement;
    private _divCombatLog: HTMLDivElement;

    // Botó
    readonly _btnAttack: HTMLButtonElement;

    constructor() {
        this._divPlayer1 = document.getElementById("divPlayer1") as HTMLDivElement;
        this._divPlayer2 = document.getElementById("divPlayer2") as HTMLDivElement;
        this._divTurnInfo = document.getElementById("divTurnInfo") as HTMLDivElement;
        this._divCombatLog = document.getElementById("divCombatLog") as HTMLDivElement;
        this._btnAttack = document.getElementById("btnAttack") as HTMLButtonElement;
    }

    public render(game: Game): void {
        this.renderPlayer(game.player1, this._divPlayer1, game.currentTurn === 1);
        this.renderPlayer(game.player2, this._divPlayer2, game.currentTurn === 2);
        this.renderTurnInfo(game);
        this.renderLog(game.lastLog);
    }

    private renderPlayer(player: Player, container: HTMLDivElement, isActive: boolean): void {
        container.innerHTML = "";

        const title = document.createElement("h2");
        title.classList.add("player-title");
        if (isActive) title.classList.add("active-player");
        title.textContent = isActive ? ⚡ ${player.name} ⚡ : player.name;
        container.appendChild(title);

        const charsDiv = document.createElement("div");
        charsDiv.classList.add("characters-row");

        player.characters.forEach((char, index) => {
            const el = this.renderCharacter(char, index, isActive && player.characters.indexOf(player.getActiveCharacter()!) === index);
            charsDiv.appendChild(el);
        });

        container.appendChild(charsDiv);
    }

    private renderCharacter(char: Character, _index: number, isActive: boolean): HTMLElement {
        const el = document.createElement("div");
        el.classList.add("character-card");
        if (!char.isAlive()) {
            el.classList.add("dead");
        } else if (isActive) {
            el.classList.add("active-char");
        }

        // Percentatge de vida
        const hpPercent = Math.max(0, (char.hp / char.maxHp) * 100);
        let hpClass = "hp-high";
        if (hpPercent <= 25) hpClass = "hp-low";
        else if (hpPercent <= 50) hpClass = "hp-mid";

        el.innerHTML = `
            <div class="char-emoji">${char.isAlive() ? char.emoji : "💀"}</div>
            <div class="char-name">${char.name}</div>
            <div class="hp-bar-container">
                <div class="hp-bar ${hpClass}" style="width: ${hpPercent}%"></div>
            </div>
            <div class="char-hp">${char.hp}/${char.maxHp} HP</div>
            <div class="char-stats">
                <span>⚔️ ${char.attackPower}</span>
                <span>🛡️ ${char.defense}</span>
            </div>
        `;

        return el;
    }

    private renderTurnInfo(game: Game): void {
        const attacker = game.getCurrentAttacker();
        if (attacker) {
            this._divTurnInfo.textContent = Torn de: ${game.getCurrentPlayer().name} — ${attacker.emoji} ${attacker.name};
        }
    }

    private renderLog(log: string): void {
        if (!log) return;

        const entry = document.createElement("div");
        entry.classList.add("log-entry");
        entry.textContent = log;

        this._divCombatLog.insertBefore(entry, this._divCombatLog.firstChild);

        // Màxim 10 entrades al log
        while (this._divCombatLog.children.length > 10) {
            this._divCombatLog.removeChild(this._divCombatLog.lastChild!);
        }
    }

    public clearLog(): void {
        this._divCombatLog.innerHTML = "";
    }

    public disableAttack(): void {
        this._btnAttack.disabled = true;
    }

    public enableAttack(): void {
        this._btnAttack.disabled = false;
    }
}