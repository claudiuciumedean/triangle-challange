const router = require("express").Router();
const path = require("path");
const { handleTriangleType } = require("./controller");

router.get("/", (req, res) => res.sendFile(path.join(`${__dirname}/../index.html`)));
router.post("/check-triangle", handleTriangleType);

module.exports = router;