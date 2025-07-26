const app = require("./src/app.js");

app.listen(process.env.serverPort, ()=>{
    console.log("Server live...");
})