// Este arquivo contem a lógica de conexão do mongodb

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect
    ('mongodb://localhost:27017/Messageria', 
    { useNewUrlParser: true}).then(() =>{
    console.log("Connected to MongoDB sucessfully");
}).catch((e) =>{
    console.log("Error while attempting to connect to MongoDB");
});

module.exports = {
    mongoose
};