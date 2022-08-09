function Gamer(id, avatar, nome, nick, email, passwordHash, score, ranking) {

    this.id = id;

    this.avatar = avatar;

    this.nome = nome;

    this.nick = nick;

    this.email = email;

    this.passwordHash = passwordHash;

    this.score = score;

    this.ranking = ranking;

}



module.exports = Gamer;