import { type EntityOptions, type TypesEntity, type ParamGenerateId, type IMineralMiner } from '../types/definition.js';
export declare const generateId: (entityType: EntityOptions, type: TypesEntity) => string;
export declare const generateGameId: () => string;
export declare const creatorId: (entityType: EntityOptions, type: TypesEntity, values: ParamGenerateId) => string;
export declare const indexOfMax: (arr: IMineralMiner[]) => number;
