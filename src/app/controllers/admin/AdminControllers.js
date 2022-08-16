const infoUser = require('../../models/User')

const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

class AdminControllers {
  // [GET] /new
  index(req, res) {
      res.render("admin/admin", {
        layout: "mana",
        user: mongoseToObject(req.user),
        url: { link: `http://localhost:3000/user${req.url}` }
      })

  }

}
module.exports = new AdminControllers();
