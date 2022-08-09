const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try { 
        console.log('Conectando ao mongodb...')
        await mongoose.connect(process.env.MONGOURL);
        console.log('MongoDB conectado com sucesso');
    } catch(error) {
        console.log("Erro de conecxao com o mongodb" + error);
    }
}

module.exports = connectDB;