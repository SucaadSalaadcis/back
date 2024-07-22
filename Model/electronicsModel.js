const mongoose = require("mongoose");

const electronicsModel = mongoose.Schema({
    ImageURL: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    pcs: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
},{timestamps: true})

module.exports = mongoose.model("electronic",electronicsModel);