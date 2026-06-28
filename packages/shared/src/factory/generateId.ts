import { dictionaryTypes } from './diccionaryId.js';
import {
    type EntityOptions,
    type TypesEntity,
    type ParamGenerateId,
    type IMineralMiner
} from '../types/definition.js';

export const generateId = (entityType: EntityOptions, type: TypesEntity): string => {
    const typeEntity = dictionaryTypes[entityType];
    const singlePart = Date.now().toString(36);
    const aleatoryPart = Math.random().toString(36).split('.')[1];

    // Al usar una alternativa por defecto evitas el IF-ELSE oculto
    if (!aleatoryPart) return '';

    return `${typeEntity}_${type}_${singlePart}${aleatoryPart}`;
};

export const generateGameId = () => {
    const singlePart = Date.now().toString(36);
    const aleatoryPart = Math.random().toString(36).split('.')[1];

    // Al usar una alternativa por defecto evitas el IF-ELSE oculto
    if (!aleatoryPart) return '';

    return `GAME_${singlePart}${aleatoryPart}`;
};

export const creatorId = (
    entityType: EntityOptions,
    type: TypesEntity,
    values: ParamGenerateId
): string => {
    // Si ya viene un ID de frontend, lo devolvemos de inmediato (Retorno temprano)
    if (values.id !== undefined) return values.id;

    const idGenerate = generateId(entityType, type);

    // Un if limpio es más fácil de parsear matemáticamente que el ternario anidado de antes
    return typeof process !== 'undefined' && process.versions?.node
        ? idGenerate
        : `FRONT_${idGenerate}`;
};

export const indexOfMax = (arr: IMineralMiner[]): number => {
    let numberMaxOfArray: number = 0;
    let indexOfMax: number = 0;

    arr.forEach((element, indexOfElemnt) => {
        const ifBigger: boolean = element.probability > numberMaxOfArray;

        if (ifBigger) {
            numberMaxOfArray = element.probability;
            indexOfMax = indexOfElemnt;
        }
    });

    return indexOfMax;
};
