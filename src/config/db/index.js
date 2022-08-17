const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://quangIT93:quangbk5492@project-mern.vrrdmlq.mongodb.net/project-mern?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        console.log("Kết nối thành công với mongoseDB!")
    } catch {
        console.log("Kết nối THẤT BẠI!!!")
    }

}

module.exports = { connect }
// mongodb+srv://man:123@cluster0.klbaw.mongodb.net/CovidSystem
