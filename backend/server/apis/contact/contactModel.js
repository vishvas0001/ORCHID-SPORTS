const mongoose = require('mongoose')
const contactschema = mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }

})


const User = module.exports = mongoose.model('contact', contactschema)
