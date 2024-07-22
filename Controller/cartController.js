const cartModel = require('../Model/cartModel');



// get cart using email
// http://localhost:3000/carts?email=sucaadsalaadosman@gmail.com 
const getCartByEmail = async (req, res) => {
    try {
        // const email = req.quary.email; // this error tooks me 30 min
        const email = req.query.email; //
        // return res.send(email);
        const query = { email: email };
        const result = await cartModel.find(query).exec(); // execute the query at a later time
        res.send(result);
        // res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get all orders
const getAllOrders = async (req, res) => {
    try {

        const email = req.query.email;
        const query = { email: email };
        const result = await cartModel.find(email);
        return res.json(result);
    } catch (error) {
        res.status(400).send(error.message)
    }
}



// post
const addTocart = async (req, res) => {
    const { menuItemId, name, recipe, ImageURL, price, quantity, email } = req.body;
    try {
        // existing menu item
        const existingCartItem = await cartModel.findOne({ menuItemId });

        if (existingCartItem) return res.status(400).json({ message: "Product already exist in the cart" });

        const cartItems = await cartModel.create({
            menuItemId, name, recipe, ImageURL, price, quantity, email
        });
        res.status(201).json(cartItems)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// delete cart 
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deleteCart = await cartModel.findByIdAndDelete(cartId);
        if (!deleteCart) return res.status(401).json({ message: "CartItem Not Found!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.status(200).json({ message: "Cart Item Deleted Successfully..." })
}

// update 
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const { menuItemId, name, recipe, ImageURL, price, quantity, email } = req.body;
    try {
        const updateCart = await cartModel.findByIdAndUpdate(
            cartId, { menuItemId, name, recipe, ImageURL, price, quantity, email },
            { new: true, runValidators: true }
        )
        if (!updateCart) return res.status(200).json({ message: "Cart Item Not Found" })
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single recipe
const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await cartModel.findById(cartId);
        res.status(200).json(cartItem);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

module.exports = {
    getCartByEmail,
    addTocart,
    deleteCart,
    updateCart,
    getSingleCart,
    getAllOrders
}