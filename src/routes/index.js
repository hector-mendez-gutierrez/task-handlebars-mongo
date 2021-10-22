const { Router } = require("express");
const router = Router();

const { renderIndex } = require("../controllers/indexControllers");

router.get("/", renderIndex);

module.exports = router;
