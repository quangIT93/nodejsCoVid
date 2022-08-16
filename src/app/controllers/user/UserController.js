const User = require('../../models/User')
const Product = require('../../models/Product')


const bcrypt = require('bcrypt')
const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

class UserController {
  // [GET] /user/pageLogin
  async pageLogin(req, res, next) {
    res.render("account/login", {
      layout: "main1",
    })
  }

  // [GET] /user/pageRegister
  pageRegister(req, res, next) {
    res.render("account/register", {
      layout: "main1",
    })
  }

  // [POST] /user/register
  async register(req, res, next) {
    const formData = req.body;
    // const salt = bcrypt.genSaltSync(10);
    // const hashed = bcrypt.hashSync(req.body.passWord, salt);
    // formData.id = 1;
    formData.admin = false;
    formData.image = '';
    formData.AccountBalance = 10000;
    formData.isLogin = false;
    formData.listShopping = [];
    formData.listRelative = [];
    formData.purchased = [];
    const listRelative = [];
    const purchased = [];
    if (formData.listRelativeName && typeof formData.listRelativeName !== 'string') {
      formData.listRelativeName.forEach((name, index) => {
        console.log('index', index)
        console.log('name', name)
        listRelative.push({ stt: index+1, name: name, cmnd: formData.listRelativeCMND[index] ,status: formData.listRelativeStatus[index] })
      })
      formData.listRelative = listRelative;
    
    } else if (typeof formData.listRelativeName === 'string'){
      listRelative.push({
        stt: 1, 
        name: formData.listRelativeName, 
        cmnd: formData.listRelativeCMND,
        status: formData.listRelativeStatus})
      formData.listRelative = listRelative;
    } else if(!formData.listRelativeName) {
      formData.listRelative = []
    }
    formData.purchased.forEach((name,index) => {
      purchased.push({image:formData.purchasedImages[index], name:name, amount:formData.purchasedAmounts[index], price:formData.purchasedPrices[index]})
    })
    formData.purchased = purchased;
    
    const user = new User(formData);
    const token = await user.generateAuthToken()
    try {
      await user.save();
      res.redirect(`/user/pageLogin`)   //chuyển sang trang login
    } catch (error) {
      res.status(500).send(error)
    }

  }

  // [GET] /user/login
  async login(req, res, next) {
    const user = await User.findByCredentials(req.body.userName, req.body.passWord, res)
    if (!user) {
      return res.render("account/login", {
        post: {
          errUserName: "invalid username",
          errPass: "invalid password "
        }
      }
      )
    } else if (user && user.admin == false) {
      Product.find({})
        .then(async product => {
          const token = await user.generateAuthToken()
          function setCookie(cname, cvalue) {
            res.cookie(cname, cvalue, { expire: 400000 + Date.now() });

          }
          setCookie("token", token)
          await res.render(`user/infoUser`, {
            product: mutipleMongoseToObject(product),
            user: mongoseToObject(user)
          })
        })
        .catch(next)
    } else if (user.admin == true) {
      const token = await user.generateAuthToken()
      function setCookie(cname, cvalue) {
        res.cookie(cname, cvalue, { expire: 400000 + Date.now() });

      }
      setCookie("token", token)
      res.redirect("/admin/sadada")
    }
  }


  async logout(req, res, next) {
    res.clearCookie('token');
    try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.render("account/login", {
        layout: "main1",
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
  // [GET] /user/:id/shopping
  shopping(req, res, next) {
    Product.find({})
      .then(item => {
        res.render("user/necessities", {
          item: mutipleMongoseToObject(item),
          user: mongoseToObject(req.user),
          url: { link: `http://localhost:3000/user${req.url}` }

        })
      })
      .catch(next)
  }


  // [GET] /user/:id
  infoUser(req, res, next) {
    res.render("user/infoUser", {
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  async choose(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then(item => {
        var quantity = req.user.listShopping.filter(product => product._id.toString() == item._id.toString())
        var product = req.user.listShopping.filter(product => product._id.toString() !== item._id.toString())
        if (quantity.length > 1) {
          // item.amount = quantity.length
          req.user.listShopping = product.concat(mongoseToObject(item))
        } else if (quantity.length < 1) {
          item.amount = item.amount + 1
          req.user.listShopping = req.user.listShopping.concat(mongoseToObject(item))
        } else if (quantity.length = 1) {
          item.amount = item.amount + 1
          req.user.listShopping = product.concat(mongoseToObject(item))
        }
        req.user.save()
        item.save()
        res.redirect(`/user/${req.user._id}/shopping`)

      })
  }

  async cancel(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then(item => {
        var quantity = req.user.listShopping.filter(product => product._id.toString() !== item._id.toString())
        req.user.listShopping = quantity
        item.amount = 0;
        req.user.save()
        item.save()
        res.redirect(`/user/${req.user._id}/shopping`)
      })
  }

  async buy(req, res, next) {
    Product.find({})
      .then(item => {
        req.user.purchased = req.user.purchased.concat(req.user.listShopping)
        req.user.listShopping = []
        item.forEach(element => {
          element.amount = 0
          element.save()
        });
        req.user.save()
        res.redirect(`/user/${req.user._id}/shopping`)
      })
  }

  dashboard(req, res, next) {
    res.render("dashboard/dashboard", {
      layout: "dashboard",
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  package(req, res, next) {
    res.render("user/package", {
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

}



// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new UserController();
