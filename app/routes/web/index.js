// required modules
const express = require("express");
const router = express.Router();

// routers
router.get("/", (req, res) => {
    res.json("This is index page");
});


// exporting modules
module.exports = router;