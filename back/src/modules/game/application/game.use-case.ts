import { type GameReaponse, type GameIdQueryStringType } from '../../../definitions/definitions.js';
import { type GameRepository } from '../domain/game.repository.js';

export class GameUseCase {
    constructor(private GameRepository: GameRepository) {}

    execute = async (credentials: GameIdQueryStringType): Promise<GameReaponse | null> => {
        const game = await this.GameRepository.findGameById(credentials.id);

        if (!game) {throw new Error('Game not found');
        return null;}

        return game;
    };
}
