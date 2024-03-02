const express = require("express");
const { getNews } = require("../controller/getNews");
const router = express.Router();

router.route("/:id").get(getNews);
module.exports = router;
