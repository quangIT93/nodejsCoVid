const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://quangIT93:quangbk5492@project-covid.wtog0wh.mongodb.net/Users?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        console.log("Kết nối thành công với mongoseDB!")
    } catch(error) {
        console.log("Kết nối THẤT BẠI!!!")
        console.log(error.message)
        process.exit(1)
    }

}

module.exports = { connect }
// mongodb+srv://man:123@cluster0.klbaw.mongodb.net/CovidSystem
