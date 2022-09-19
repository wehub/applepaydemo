// for nested objects, returns nested value, otherwise if object or any keys are undefined, returns undefined
// keys is an array of string keys
// currIdx used for recursive calls
export const chained = (obj, keys, currIdx = 0) => {
    const curVal = obj && obj[keys[currIdx]];
    if (typeof curVal === "object"){
        return chained(curVal, keys, currIdx + 1);
    }
    if(currIdx === keys.length - 1){
        return curVal;
    }
    return undefined;
}