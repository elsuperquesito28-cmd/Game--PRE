export default class Minero {
    type: string;
    name: string;
    maxLevel: number;
    level: number;
    cost: number;
    costImprovement: number;
    tool;
    force: number;
    id: string;

    constructor(values: Record<string, any>) {
        const { type, name, maxLevel, level, cost, costImprovent, tool, force, id } = values;
        this.type = type;
        this.name = name;
        this.maxLevel = maxLevel;
        this.level = level;
        this.cost = cost;
        this.costImprovement = costImprovent;
        this.tool = tool;
        this.force = force;
        this.id = id;
    }
    static calcularFuerza(nivelJugador: number, totalNiveles = 25): number {
        const pesos = [];
        for (let i = 1; i <= totalNiveles; i++) {
            const distancia = Math.abs(i - nivelJugador);
            const peso = Math.pow(0.4, distancia);
            pesos.push({ nivel: i, peso: peso });
        }
        const sumaTotal = pesos.reduce((acc, item) => acc + item.peso, 0);
        let azar = Math.random() * sumaTotal;
        for (let minero of pesos) {
            if (azar < minero.peso) return minero.nivel;
            azar -= minero.peso;
        }
        return totalNiveles;
    }
    producir(minerales: Record<string, any>, multi = 1) {
        let mineralEncontrado = null;
        const nombresMineros = [
            'rubi',
            'diamante',
            'oro',
            'hierro',
            'bronce',
            'carbon',
            'terracota'
        ];
        for (let i = 0; i < (this.force + this.tool.efficiency) * multi; i++) {
            const dado = Math.random();
            for (let nombre of nombresMineros) {
                const info = minerales[nombre];
                let probBase = info.probabilidad / 100;
                let bono = this.tool.fortune * this.tool.posibibity;
                let probFinal = probBase < 0.1 ? probBase + bono : probBase;
                if (dado < probFinal) {
                    mineralEncontrado = { nombre: nombre, monedas: info.precio };
                    break;
                }
            }
            if (mineralEncontrado && mineralEncontrado.nombre === 'rubi') break;
        }
        return mineralEncontrado || { nombre: null };
    }
}
