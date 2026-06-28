export default class {
    protected coins: number;
    protected clickCoins: number;
    protected level: number;
    protected levelNumber: number;
    protected limit: number;
    constructor() {
        this.coins = 50;
        this.clickCoins = 1;
        this.level = 1;
        this.levelNumber = 0;
        this.limit = 0;
    }
    upgradeLevel = () => {
        const upgrades = Array.from({ length: 25 }, (_, i) => (i + 3) * 5 + 1);
        if (upgrades.includes(this.levelNumber)) this.level += 1;
    };
}
