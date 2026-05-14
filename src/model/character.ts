export class Character {
    private _name: string;
    private _hp: number;
    private _attackPower: number;
    private _defense: number;
    private _img: string;

    constructor(name: string, hp: number, attackPower: number, defense: number, img: string) {
        this._name = name;
        this._hp = hp;
        this._attackPower = attackPower;
        this._defense = defense;
        this._img = img;
    }

    // GETTERS I SETTERS

    get name(): string {
        return this._name
    }

    set name(newName: string) {
        this._name = newName;
    }

    get hp(): number {
        return this._hp
    }

    set hp(newHp: number) {
        this._hp = newHp;
    }

    get attackPower(): number {
        return this._attackPower
    }

    set attackPower(newAttackPower: number) {
        this._attackPower = newAttackPower;
    }

    get defense(): number {
        return this._defense
    }

    set defense(newDefense: number) {
        this._defense = newDefense;
    }

    get img(): string {
        return this._img;
    }

    set img(newImg: string) {
        this._img = newImg;
    }

    // METODES

    public attack(target: Character): void {
        let damage = this._attackPower - target.defense;
        if (damage < 1) {
            damage = 1;
        }
        target.takeDamage(damage);
    }

    public takeDamage(amount: number): void {
        this._hp = this._hp - amount;
        if (this._hp < 0) {
            this._hp = 0;
        }
    }

    public isAlive(): boolean {
        return this._hp > 0;
    }

    public showStatus(): void {
        console.log(`${this._name} - Vida: ${this._hp} | Atac: ${this._attackPower} | Defensa: ${this._defense}`);
    }
}
