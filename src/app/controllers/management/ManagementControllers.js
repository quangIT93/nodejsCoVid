const infoUser = require('../../models/User')

const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

class ManagementControllers {
  index(req, res) {

    res.render("manager/manager", {
      layout: "mana",
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })

}
}


// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new ManagementControllers();
