const { default: mongoose } = require("mongoose")

let connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/kodex')
    } catch (error) {
        console.log('error', error)
    }

} 

module.exports = connectDB