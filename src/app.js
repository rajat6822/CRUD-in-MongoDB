const express = require('express');
const ProductModel = require('./models/user.model');

const app = express()

app.use(express.json())

// Create Product in DB
app.post('/create-product', async (req, res) => {
    try {

        let { name, price, description, category, stock } = req.body

        if (!name || !price || !description || !category || !stock) {
            return res.status(400).json({
                message: "All feilds are required"
            })
        }

        let newProduct = await ProductModel.create({
            name,
            price,
            description,
            category,
            stock,
        })

        console.log(newProduct)

        return res.status(201).json({
            message: 'Product created succesfully',
            product: newProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Server error',
        })
    }
})

// Get all products from DB
app.get('/get-all-products', async (req, res) => {

    let products = await ProductModel.find()

    return res.status(200).json({
        message: 'Products fetched succesfully',
        products
    })

})

// Get product by id from DB
app.get('/get-product-by-id/:id', async (req, res) => {
    let { id } = req.params
    console.log(id)

    let product = await ProductModel.findById(id)

    return res.status(200).json({
        message: 'Here Is your product by id',
        product
    })
})

// Update product by id from DB
app.put('/update-product-by-id/:id', async (req, res) => {
    try {

        let { id } = req.params

        let { name, price, description, category, stock } = req.body

        if (!name || !price || !description || !category || !stock) {
            return res.status(400).json({
                message: "All feilds are required"
            })
        }

        let updateProduct = await ProductModel.findByIdAndUpdate(id,{
            name,
            price,
            description,
            category,
            stock
        },{
            new: true
        }
        )

        return res.status(200).json({
            message:'Product Updated',
            updateProduct
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Delete product by id from DB
app.delete('/delete-product-by-id/:id', async (req, res) => {
    try {

        let {id} = req.params

        await ProductModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: 'Product Deleted'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        })
    }
})


module.exports = app