const { mongooseConnectionString } = require("../config.json");
const mongoose = require("mongoose");

module.exports = async () => {
    if (!mongooseConnectionString) return;

    await mongoose.connect(mongooseConnectionString, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    return mongoose.connection
};