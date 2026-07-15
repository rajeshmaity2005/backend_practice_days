/**
 * To start a server
 * Connect with database
 */

const app = require('./src/app.js')
const mongoose = require("mongoose")
// const dns = require('dns')

// dns.setServers([
//     '1.1.1.1',
//     '8.8.8.8'
// ])

function ToConnectDb() {
    mongoose.connect("YOUR_MONGODB_CONNECTION_STRING_HERE")
        .then(() => {
            console.log('DataBase Connected Successfully.');
        })
}
ToConnectDb();


app.listen(3000, () => {
    console.log('Server is running at port 3000.');
})