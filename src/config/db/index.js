const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/project_shop_dev");
        console.log("Kết nối thành công với mongoseDB!")
    } catch {
        console.log("Kết nối THẤT BẠI!!!")
    }

}

module.exports = { connect }
// mongodb+srv://man:123@cluster0.klbaw.mongodb.net/CovidSystem