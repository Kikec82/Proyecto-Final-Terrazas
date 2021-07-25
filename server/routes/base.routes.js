const router = require("express").Router();

router.get("/",(req,res,next)=>res.json("index"))

module.exports = router; 