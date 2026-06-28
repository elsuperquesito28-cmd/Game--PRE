import {
    Constructor,
    mixinBuilding,
    IBuilding,
    mixinTool,
    buildingOption
} from '../../type/logic/interface';

import { createBuilding } from '../factory/factory';

export default function buildinMixin<TBase extends Constructor<mixinTool>>(
    Base: TBase
): mixinBuilding {
    class building extends Base {
        protected building: Record<buildingOption, IBuilding>;

        constructor(...args: any[]) {
            super(...args);
            this.building = {
                little: createBuilding('little'),
                middle: createBuilding('middle'),
                big: createBuilding('big')
            };
        }

        buyBuilding = (type: buildingOption) => {
            const building = this.building[type];
            if (!building) throw new Error('No existe edificio');
            if (this.coins < building.cost) throw new Error('Monedas insuficientes');

            this.coins -= building.cost;
            building.quantity += 1;
            building.cost *= 1.8;
        };

        upgradeBuilding = (id: number) => {
            const building = Object.values(this.building).find(n => n.id === id);
            if (!building) throw new Error('No existe edificio');
            if (building.quantity === 0) throw new Error('No tienes este edificio');
            if (building.level >= building.maxLevel)
                throw new Error('Has llegado al limite de mejora');
            if (this.coins < building.costImprovement) throw new Error('Monedas insuficientes');
            this.inventory.terracota -= building.costImprovement;
            building.capacity = building.capacity * 0.05;
            building.costImprovement += 2;
            building.level += 1;
            this.upgradeNumber += 1;
            this.upgradeLevel();
        };

        limit = () => {};
    }

    return building;
}
