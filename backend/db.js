const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/vnotebook?directConnection=true"



const connectToMongo = ()=>{
   try {
      mongoose.connect(mongoURI)
      console.log("successfully connected to mongo");
   } catch (error) {
      console.log(error)
   }
   
}

module.exports = connectToMongo;