import {} from '../../../definitions/definitions.js';
import {} from '../domain/game.repository.js';
export class GameUseCase {
    GameRepository;
    constructor(GameRepository) {
        this.GameRepository = GameRepository;
    }
    execute = async (credentials) => {
        const game = await this.GameRepository.findGameById(credentials.id);
        if (!game) {
            throw new Error('Game not found');
            return null;
        }
        return game;
    };
}
//# sourceMappingURL=game.use-case.js.map