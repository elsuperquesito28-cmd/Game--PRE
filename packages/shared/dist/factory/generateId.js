import { dictionaryTypes } from './diccionaryId.js';
export const generateId = (entityType, type) => {
    const typeEntity = dictionaryTypes[entityType];
    const singlePart = Date.now().toString(36);
    const aleatoryPart = Math.random().toString(36).split('.')[1];
    // Al usar una alternativa por defecto evitas el IF-ELSE oculto
    if (!aleatoryPart)
        return '';
    return `${typeEntity}_${type}_${singlePart}${aleatoryPart}`;
};
export const generateGameId = () => {
    const singlePart = Date.now().toString(36);
    const aleatoryPart = Math.random().toString(36).split('.')[1];
    // Al usar una alternativa por defecto evitas el IF-ELSE oculto
    if (!aleatoryPart)
        return '';
    return `GAME_${singlePart}${aleatoryPart}`;
};
export const creatorId = (entityType, type, values) => {
    // Si ya viene un ID de frontend, lo devolvemos de inmediato (Retorno temprano)
    if (values.id !== undefined)
        return values.id;
    const idGenerate = generateId(entityType, type);
    // Un if limpio es más fácil de parsear matemáticamente que el ternario anidado de antes
    return typeof process !== 'undefined' && process.versions?.node
        ? idGenerate
        : `FRONT_${idGenerate}`;
};
export const indexOfMax = (arr) => {
    let numberMaxOfArray = 0;
    let indexOfMax = 0;
    arr.forEach((element, indexOfElemnt) => {
        const ifBigger = element.probability > numberMaxOfArray;
        if (ifBigger) {
            numberMaxOfArray = element.probability;
            indexOfMax = indexOfElemnt;
        }
    });
    return indexOfMax;
};
