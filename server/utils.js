exports.convertObjStringsToNumbers = obj => {
    if(!Object.keys(obj).length) { return null; }

    for(let key in obj) {
        const val = Number(obj[key]);
        if(isNaN(val) || val < 1) { return null; }
        obj[key] = val;
    }
    
    return obj;
}