const express = require("express");

const app = new express();

app.get("/", (req, res) => {
    res.json({
        message: "hello"
    })
})

app.listen(3000);
