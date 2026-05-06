import type { Game } from "./model/Game";
import type { View } from "./View";
import Swal from "sweetalert2";

export class Controller {
    private _game: Game;
    private _view: View;

    constructor(game: Game, view: View) {
        this._game = game;
        this._view = view;
        this.bindEvents();
    }

    public init(): void {
        this._view.render(this._game);
    }

    private bindEvents(): void {
        this._view._btnAttack.addEventListener("click", () => this.handleAttack());
    }

    private handleAttack(): void {
        // Executem l'atac
        this._game.attack();
        this._view.render(this._game);

        // Comprovem si la batalla ha acabat
        if (this._game.isOver()) {
            this._view.disableAttack();
            const winner = this._game.getWinner();

            Swal.fire({
                title: ${winner?.name} ha guanyat!,
                text: "La batalla ha acabat. Vols tornar a jugar?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Tornar a jugar",
                cancelButtonText: "Sortir",
                background: "#1a0533",
                color: "#fff",
                confirmButtonColor: "#7b2ff7",
                cancelButtonColor: "#555"
            }).then((result) => {
                if (result.isConfirmed) {
                    this._game.restart();
                    this._view.clearLog();
                    this._view.enableAttack();
                    this._view.render(this._game);
                }
            });
        }
    }
}