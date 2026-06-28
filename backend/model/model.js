import db from '../database/DB.js';
import dataTable from './tables.js';

export default class GameModel {
    constructor() {
        this.prepared = new Map();
        this.index = 0;
    }
    prepare = config => {
        const separetor = config.type.split(' ');
        config.type = separetor[0];
        config.table = separetor[1];
        console.log('holaaaa');

        if (!config.type || !config.table) throw new Error('Capms incomplete');
        if (config.permission && Array.isArray(config.data)) throw new Error('');

        if (config.type === 'insert') {
            console.log('estamso en el insert');
            const table = dataTable[config.table];
            const values = Object.values(table);

            const paramsQuery = values.map(([, paramName]) => paramName).join(', ');
            const columnsTable = values.map(([columnName]) => columnName).join(', ');

            const query = `INSERT INTO ${config.table} (${columnsTable}) VALUES (${paramsQuery})`;

            this.index++;

            const value = {
                type: 'insert',
                query: db.prepare(query),
                data: config.data,
                count: 0,
                limit: config.limit
            };
            this.prepared.set(this.index, value);
            if (config.permission)
                return this.run({
                    ...value,
                    index: this.index
                });
            return this.index;
        }
    };

    run = config => {
        console.log('esmaos en el run');
        if (!config) throw new Error('Is necesarie the camp config');
        config.count++
        config.index = config.index ? config.index : this.index;
        console.log(this.prepared);
        const query = this.prepared.get(config.index);


        if (!query) throw new Error('This query not exists');
        if (config.limt <= config.count) this.prepared.delete(config.index);

        return query.query.run(config.data);
    };

    select = config => {
        if (!['all', 'get'].includes(config.type)) throw new Error('Ta mal');
        const query = `SELECT ${config.columnsSelect} FROM ${config.table} WHERE ${config.condition} = ?`;
        return db.prepare(query)[config.type](config.value);
    };
    transaction = functionN => db.transaction(functionN);
}

//type, columnsSelect, table, condition, value
