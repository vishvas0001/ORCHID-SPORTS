let mongoose = require('mongoose')
const dbPath = 'mongodb://127.0.0.1:27017/sportEcommerce'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dbPath, options).then(res => {
    console.log("Db Connected")
}).catch(err => {
    console.log("Db Connect Err", err)
})
