exports.convertObjStringsToNumbers = obj => {
    if(!Object.keys(obj).length) { return null; }

    for(let key in obj) {
        const val = parseInt(obj[key]);
        if(isNaN(val)) { return null; }
        obj[key] = val;
    }
    
    return obj;
}