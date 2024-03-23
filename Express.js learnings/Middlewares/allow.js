/* allow only 5 requests to a user per second */

const express = require("express");
const app = express();

app.use(express.json());

let allUsersWithReqCount = {};

setInterval(() => {
    allUsersWithReqCount = {};
}, 1000);


function checkReqCountForUser(req, res, next) {
    const userName = req.body.userName;

    if(allUsersWithReqCount[userName]) {
        if(allUsersWithReqCount[userName] > 5) {
             res.status(411).json({
                res: "user request limit reached"
            });
            return;
        } else {
            allUsersWithReqCount[userName] = allUsersWithReqCount[userName] + 1;
        } 
    } else {
        allUsersWithReqCount[userName] = 1;
    }
    next();
}


app.post("/users", checkReqCountForUser,(req, res) => {
    res.json({
        res: allUsersWithReqCount
    })
});


app.listen(3000);