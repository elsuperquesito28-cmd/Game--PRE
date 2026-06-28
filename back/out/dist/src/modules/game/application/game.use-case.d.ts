import { type GameReaponse, type GameIdQueryStringType } from '../../../definitions/definitions.js';
import { type GameRepository } from '../domain/game.repository.js';
export declare class GameUseCase {
    private GameRepository;
    constructor(GameRepository: GameRepository);
    execute: (credentials: GameIdQueryStringType) => Promise<GameReaponse | null>;
}
//# sourceMappingURL=game.use-case.d.ts.map