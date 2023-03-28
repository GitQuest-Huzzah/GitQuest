const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");
const argon2 = require("argon2");
const { V4: PasetoV4 } = require("paseto");

const User = db.define("user", {
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING
    },
    slackID: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gitHubID: {
        type: Sequelize.STRING,
    },
    gitHubLogin: {
        type: Sequelize.STRING,
    },
    gitHubToken: {
        type: Sequelize.STRING,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

module.exports = User;

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

User.prototype.correctPassword = function (candidatePwd) {
    return argon2.verify(this.password, candidatePwd);
};

User.authenticate = async function ({ email, password }) {
    console.log(email, password);
    const user = await this.findOne({ where: { email } });
    if (!user || !(await user.correctPassword(password))) {
        const error = Error("Incorrect Email / Password");
        error.status = 401;
        throw error;
    }
    return user.generateToken();
};

User.prototype.generateToken = async function () {
    console.log(privateKey.toString("hex"), "Private Key in generate");
    return PasetoV4.sign({ id: this.id }, privateKey);
};

User.findByToken = async function (token) {
    try {
        console.log(publicKey, "public key in findBy");
        const { id } = await PasetoV4.verify(token, publicKey);
        const user = await User.findByPk(id);
        if (!user) {
            throw "noo";
        }
        return user;
    } catch (err) {
        const error = Error("bad token");
        error.status = 401;
        throw error;
    }
};

const hashPassword = async (user) => {
    if(!user.password){
        return
    }
    if (user.changed("password")) {
        user.password = await argon2.hash(user.password);
    }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
