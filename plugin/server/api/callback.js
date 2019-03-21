var express = require('express');
var fs = require('fs');
var routers = express.Router();
routers.use("/", function (r1, r2) {
    var key = r1.session.name;
    var name;
    var result = fs.readFileSync(__dirname + "/result.json", "utf-8");
    result = JSON.parse(result);
    result.forEach(i => {
        if (i.name === key) {
            name = i.path;
        }
    });
    if (!name) {
        r2.send({select: "false", result: "/route/home"});
        return;
    }
    r2.send({result: name, select: "true"});
})
module.exports = routers;