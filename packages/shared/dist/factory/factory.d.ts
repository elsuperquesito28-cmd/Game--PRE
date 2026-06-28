import { type EntityOptions, type EntityValuesMap, type EntityReturnMap } from '../types/definition.js';
export declare const createEntity: <T extends EntityOptions>(entityType: T, values: EntityValuesMap[T]) => EntityReturnMap[T];
