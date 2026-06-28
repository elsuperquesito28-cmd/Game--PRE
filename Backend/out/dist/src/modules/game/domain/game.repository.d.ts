import { type GameEntity } from './game.entity.js';
export interface GameRepository {
    findGameById: (id: string) => Promise<GameEntity | null>;
    insertNewGame: () => Promise<string>;
}
//# sourceMappingURL=game.repository.d.ts.map