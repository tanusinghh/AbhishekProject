const connection = require('./db/connection');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const app = express();
app.use(cors());
// app.use(express.json());
const userRoute = require('./routes/user')
const country = require('./routes/country')


//data base connection 
connection
//call apis
app.use("/api/users",userRoute);
app.use("/api/data",country);

app.listen(process.env.PORT, () => 
console.log(chalk.magenta(`🚀 listening on port! 🚀${process.env.PORT}  `)))
