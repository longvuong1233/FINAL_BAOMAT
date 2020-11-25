const mongoose = require("mongoose")

const databaseConnect = () => {
    mongoose.connect("mongodb://localhost:27017/baomat", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
            console.log('✅ Database was connected');
        })
        .catch(() => {
            console.error(`❌ Failed with ${error}`)
        })
}
module.exports = databaseConnect