const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
    avatar: String,
    nome: String,
    nick: String,
    email:String,
    passwordHash: String,
    score: Number,
    ranking: Number,
});

const modelName = 'Users';
if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}