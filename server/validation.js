const messages = require("./app-messages");
const { convertObjStringsToNumbers } = require("./utils");
const Triangle  = require("./triangle");

exports.getTriangleType = obj => {
    let resp;
    obj = convertObjStringsToNumbers(obj);

    if(!obj || Object.keys(obj).length !== 3) {
        resp = messages.invalidData;
    } else if(!Triangle.isTriangle(obj)) {
        resp = messages.incorectTriangle;
    } else {
        const triangle = new Triangle(obj);
        resp = messages.success(triangle.type);
    }
    
    return resp;
}