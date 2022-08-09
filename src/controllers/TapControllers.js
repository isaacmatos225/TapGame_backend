const mongoose = require('mongoose');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
module.exports = {
    signup: async (req, res) => {
        const { avatar, nome, nick, email, password, score, ranking } = req.body;

        const userExist = await Users.findOne({ email });//verificando se ja existe cadastro
        if (userExist) {
            res.json({
                data: [],
                error: 'usuario invalido'
            });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        let addUser = new Users({ avatar, nome, nick, email, password, score, ranking });
        const saveUsers = await addUser.save();
        if (!saveUsers) {
            res.json({
                error: 'Erro ao adicionar um carro'
            });
        }
        res.json({
            data: saveUsers
        });
    },
    signin: async (req, res) => {
        const { email, password } = req.body;
        const userExist = await Users.findOne({ email });
        if (!userExist) {
            res.json({
                data: [],
                error: 'usuario invalido'
            })
            return;
        }
        const match = await bcrypt.compare(password, userExist.passwordHash);
        if(!match) {
            res.json({
                data: [],
                error: 'credencial invalida'
            });
            return;
        }
        res.json({
            data: userExist
        });
        /*if(!user) {
            res.json({
                error: 'Erro ao adicionar um carro'
            });
        }

        if(user.passwordHash === password) {
            res.json({
                data: user
            });
        }*/
    },
    ranking: async (req, res) => {
        const rankingList = await Users.find({ ranking: { $gt: 0 }, score: { $ne: 00 } })
            .sort({ ranking: 1 })
            .limit(10)
            .select({
                ranking: 1,  
                avatar: 1,
                nick: 1,
                score: 1,
                _id: 0
            }).exec();
        res.json({
            data: rankingList
        });

    },
    /*getid: async(req, res) => {
        const id = req.params.email;
        const listTap = await Tap.findById(id);
        if(!listTap) {   
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        } else { 
            res.json({
                data: listTap
            });
        }
    }
    deleteid: async(req, res) => {
        const id = req.params.id;
        const listTap = await Tap.findByIdAndDelete(id);
        if(!listTap) {   
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        } else { 
            res.json({
                data: listTap
            });
        }

    },
    */
    updateid: async (req, res) => {
        const id = req.params.id;
        const { avatar, nome, nick, email } = req.body;
        const userUpdate = await User.findByIdAndUpdate(id, { avatar, nome, nick, email });
        if (!userUpdate) {
            res.json({
                data: [],
                error: 'Erro ao adicionar um usuario'
            });
        } else {
            const { avatar, nome, nick, email, passwordHash, score, ranking } = req.body;
            TapUpdate.avatar = avatar;
            TapUpdate.nome = nome;
            TapUpdate.nick = nick;
            TapUpdate.email = email;
            TapUpdate.passwordHash = passwordHash;
            TapUpdate.score = score;
            TapUpdate.ranking = ranking;
            let Userindex = Users.findIndex(carro => carro.id == id);
            User[carroindex] = carroUpdate;
            res.json({
                data: RentCar[carroindex]
            });
        }
    },
    score: async (req, res) => {

        const nick = req.params.nick;
        const novoScore = req.params.score;
        const user = await Users.findOne({ nick })

        if (!user) {
            res.json({
                data: [],
                error: 'usuario invalido'
            });
            return;
        }

        const id = user._id;
        const scoreAtual = user.score;

        if (novoScore > scoreAtual) {
            await Users.findByIdAndUpdate(id, { score: novoScore });
            const geraRanking = await Users.aggregate([
                {
                    $setWindowFields: {
                        sortBy: { score: -1 },
                        output: {
                            ranking: {
                                $rank: {}
                            }
                        }
                    }
                }
            ]).exec();
            geraRanking.map(user => {
                Users.updateOne({ _id: user._id }, { ranking: user.ranking })
            });
        }
        res.json({
            data: [],
            msg: 'Score alterado com sucesso'
        });
    }
}