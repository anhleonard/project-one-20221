let Login = require('../models/login');

const loginController = {
    startLogin: async (req,res) => {
        res.render('login');
    },
    passLogin: async(req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        
        Login.findOne({ username: username, password: password }, (err,data) => {
            if(err) return err;
            if(data) {
                res.render('home');
            }
            else {
                res.send('Bạn đã đăng nhập không thành công!');
            }
        })
        
    }
}

module.exports = loginController;