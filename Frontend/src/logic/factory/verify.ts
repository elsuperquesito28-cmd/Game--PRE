export const verify = (values: Record<string, any>) => {
    if (!values) throw new Error('Values are not ingress in verifycation');
    Object.keys(values).forEach(n => {
        if (values[n] === undefined || values[n] === '' || values[n] === null)
            throw new Error(`The camp ${n} are incomplete`);
    });
};
