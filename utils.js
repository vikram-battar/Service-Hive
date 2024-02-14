const jwt = require('jsonwebtoken');
const config = require('./config.json');
const {searchUser} = require('./database/queries')
var { users, products } = require('./db');

// UTILS

const getProduct = (productId) => {
    return new Promise((resolve, reject) => {
        products.findOne({ _id: productId }, (err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
};

const verifyAuth = (req, res, next) => {
    console.log("asdfg")
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ').length > 1 &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            config.jwtSecret,
            {},
            async(err, payload) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Bad or expired token'
                    });
                }
            //     users.findOne({ username: payload.username }, (err, user) => {
            //         if (err) {
            //             return handleError(res, err);
            //         }
            //         if (!user) {
            //             return res.status(400).json({
            //                 success: false,
            //                 message: 'Bad token or user no longer exists'
            //             });
            //         }
            //         req.user = user;
            //         next();
            //     });

            let user = await searchUser(payload.username);
                if (!user[0]) {
                    return res.status(400).json({
                        success: false,
                        message: 'Bad token or user no longer exists'
                    });
                }
                req.user = user[0];
                    next();
            }
        );
    } else {
        return res.status(401).json({
            success: false,
            message: 'Protected route, Oauth2 Bearer token not found'
        });
    }
};

const handleError = (res, err) => {
    console.log(err);
    return res.status(500).json({
        success: false,
        message:
            'Something went wrong. Check the backend console for more details'
    });
};

module.exports.handleError = handleError;
module.exports.verifyAuth = verifyAuth;
module.exports.getProduct = getProduct;
