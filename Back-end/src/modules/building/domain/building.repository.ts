import { type IBuilding } from 'shared';

export interface BuildingRepository {
    GetBuildignsByGameId: (gameId: string) => Promise<IBuilding[] | null>;
}
