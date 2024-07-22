const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    menuItemId: String,
    name: {
       type: String,
       require: true,
       minlength: 3
    },
    recipe: String,
    ImageURL: String,
    price: Number,
    quantity: Number,
    email: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("carts",cartSchema);