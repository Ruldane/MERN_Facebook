const express = require("express");
const { imageUpload } = require("../middlewares/imageUpload");
const { uploadImages } = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);

module.exports = router;
