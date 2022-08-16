const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authManager = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/user/pageLogin");
    }
    try {
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if(user.admin == false){
            return res.render("account/login", {
                post: {
                  errUserName: "CHU' MA'Y KHONG PHAI LA ADMIN NHE",
                  errPass: "cutttttttttttttttttt"
                }
              })
        }else{
            req.user = user;
            req.token = token;
            return next();
        }
    } catch {
        return res.sendStatus(403);
    }

}
module.exports = authManager