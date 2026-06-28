import {
    Base,
    Constructor,
    mixinTool,
    ITool,
    toolOption,
    BaseTool
} from '../../type/logic/interface';
import { createEntity, createTool } from '../factory/factory';

/**
 * Funcion mixin que crea el mixin de herramientas
 * @param Main - tiene que ser el juego base
 * @returns devuele una clase extendida de juegoBase
 */

export function toolMixin<TBase extends Constructor<Base>>(Main: TBase): mixinTool {
    class ToolMixin extends Main {
        protected tool: Record<toolOption, Map<number, ITool>>;
        protected toolBase: BaseTool[];

        constructor(...args: any[]) {
            super(...args);
            const [, tools] = createEntity();
            this.tool = tools.tool;
            this.toolBase = tools.base;
        }

        buyTool = (type: toolOption, id: number = 0) => {
            if (type === 'pick') throw new Error('The pickaxe cannot be bought');

            const toolBase = this.toolBase.find(n => n.type === type);

            if (!toolBase) throw new Error('This tool not exists');

            if (this.coins < toolBase.cost) throw new Error('Dont have enogth coins');

            this.coins -= toolBase.cost;
            toolBase.cost *= 1.3;
            const ToolId = id > 0 ? id : 0;
            const tool = createTool(type, {
                availability: true,
                reference: toolBase,
                id: ToolId
            });

            this.tool[type].set(tool.id, tool);
        };

        upgradeTool = (id: number, type: toolOption) => {
            const tool = this.tool[type].get(id);
            if (!tool) throw new Error('This tool not exists in your inventort');
            if (tool.maxLevel <= tool.level) throw new Error('This tool reached its maximum level');
            if (this.coins < tool.cost) throw new Error('Coins enougth');
            this.coins -= tool.costImprovement;
            tool.probability *= 0.03;
            tool.costImprovement *= 1.5;
            tool.level += 1;
        };
    }

    return ToolMixin as unknown as mixinTool;
}
