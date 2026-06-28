import { type BuildingReaponse, type BuildingParams } from '../../../definitions/definitions.js';
import { type BuildingRepository } from '../domain/building.repository.js';

export class BuildingUseCaseGet {
    constructor(private buildingRepositoty: BuildingRepository) {}

    execute = async (credentials: BuildingParams): Promise<BuildingReaponse | null> => {
        const buildings = await this.buildingRepositoty.GetBuildignsByGameId(credentials.id);

        if (buildings) return buildings;

        throw new Error('The gameId are incorrect');
        return null
    };
}
