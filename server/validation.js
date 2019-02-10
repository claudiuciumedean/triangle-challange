const messages = require("./server-messages");
const { convertObjStringsToNumbers } = require("./utils");
const Triangle  = require("./triangle");

exports.getTriangleType = obj => {
    let resp;
    let statusCode;
    obj = convertObjStringsToNumbers(obj);

    if(!obj || Object.keys(obj).length !== 3) {
        resp = messages.invalidData;
        statusCode = 417;
    } else if(!Triangle.isTriangle(obj)) {
        resp = messages.incorectTriangle;
        statusCode = 417;
    } else {
        const triangle = new Triangle(obj);
        resp = messages.success(triangle.type);
        statusCode = 200;
    }
    
    return {
        "statusCode":  statusCode,
        "message": resp
    };
}