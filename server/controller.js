const { getTriangleType } = require("./validation");

exports.handleTriangleType = async (req, res) => await res.status(200).json(getTriangleType(req.body));