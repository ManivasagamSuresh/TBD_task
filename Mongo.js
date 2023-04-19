const mongo = require("mongodb");
const env  = require("dotenv").config();
const Url = process.env.url;
const mongoclient =new mongo.MongoClient(Url);

let db;
let connect;

const mongoConnect = async()=>{
    try {
        const connect =await mongoclient.connect();
    const db = connect.db("TBD_TASK");
    return db;
    } catch (error) {
        console.log(error);
    }

}

const closeConnection =async()=>{
    try {
        if(connect){
            await connect.close();
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {mongoConnect,closeConnection,db,connect}