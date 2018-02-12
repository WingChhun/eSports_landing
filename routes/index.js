const express = require("express"),
    router = express.Router({
        mergeParams:true
    });


//Root /api route
router.get("/", (req, res) => {

    res.send("Router route");
});

//export all routes
module.exports = router;