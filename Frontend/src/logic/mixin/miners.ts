import {
    mixinMiner,
    Constructor,
    mixinTool,
    minerOption,
    IMiner,
    BaseMiner
} from '../../type/logic/interface';

import { createMiners } from '../factory/factory';

export function minermixin<TBase extends Constructor<mixinTool>>(Base: TBase): mixinMiner {
    class Miner extends Base {
        protected miner: Record<minerOption, Map<number, IMiner>>;
        protected minerBase: BaseMiner[];
        protected minerName: Record<minerOption, number>;
        constructor(...args: any[]) {
            super(...args);
            const [miner] = createEntity();
            this.miner = miner.miner;
            this.minerBase = miner.base;

            this.minerName = miner.name;
        }

        buyMiner = (type: minerOption, id: Record<'tool' | 'miner', number>) => {
            //Comparacion de los edificios
            const minerBase = this.minerBase.find((n: BaseMiner) => n.type === type);
            if (!minerBase) throw new Error('This type of miner not exists');
            const { tool, miner } = createMiners(type, {
                name: `Miner ${type} ${this.minerName[type]}`,
                levelGame: this.level,
                id: { miner: id.miner, tool: id.tool }
            });

            this.coins -= miner.cost;

            minerBase.cost = Math.floor(minerBase.cost * 1.35);
            this.miner[type].set(miner.id, miner);
            this.tool.pick.set(tool.id, tool);

            this.minerName[type] += 1;
        };

        upgrdeMiner = (id: number, type: minerOption) => {
            const miner = this.miner[type].get(id);
            if (!miner) throw new Error('This miner not exists');
            if (miner.maxLevel <= miner.level)
                throw new Error('Has llegado al nivel maximo de fuerza de este minero');
            if (this.coins < miner.costImprovement) throw new Error('Necesitas mas monedas');
            this.coins -= miner.costImprovement;
            miner.force += 1;
            miner.level += 1;
            miner.costImprovement = Math.floor(miner.costImprovement * 1.35);

            this.upgradeNumber += 1;
            this.upgradeLevel();
        };
    }

    return Miner as unknown as mixinMiner;
}
