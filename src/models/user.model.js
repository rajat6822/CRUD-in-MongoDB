let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
},{
    timestamps: true
})

let ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel