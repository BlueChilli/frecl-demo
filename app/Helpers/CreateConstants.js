import asyncActionSuffixes from "../Constants/asyncActionSuffix";


export function createConstants(...constants) {
    const v = constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});

    return v;
}

export function createAsyncConstants(...constants) {

    const suffixes = asyncActionSuffixes;

    let v = [];

    constants.forEach((m, i) => {
        v.push(m);
        v.push(m + "_" + suffixes[0]);
        v.push(m + "_" + suffixes[1]);
        v.push(m + "_" + suffixes[2]);
    });

    return v;
}