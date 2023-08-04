const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017"


const connectToMongo = async ()=>{
   await mongoose.connect(mongoURI)
   console.log("successfully connected to mongo");
}

module.exports = connectToMongo;