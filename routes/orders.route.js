const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const { orderValidator } = require('../utils/validators');
const { body, validationResult } = require('express-validator');
const Order = require('../models/orders.model');
const User = require('../models/user.model');
const Object = require('../models/object.model');

router.get(
'/list', 
async (req, res, next) => {
try {
    if (req.user.role === roles.admin) {
        const orders = await Order.find()
        res.render('orders', { orders });
    }
    else if (req.user.role === roles.master) {
        const order_status = 'В работе'
        const order_master_login =  req.user.username
        const orders = await Order.find({order_status, order_master_login})
        res.render('orders', { orders })
    }
    else {
        const order_client_login =  req.user.username
        const orders = await Order.find({order_client_login})
        res.render('orders', { orders })
    }
} catch (error) {
    next(error);
}
});

router.post(
'/newOrder',
orderValidator,
async (req, res, next) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
        req.flash('error', error.msg);
        });
        res.render('/', {
        username: req.body.order_client_login,
        messages: req.flash(),
        });
        return;
    }

    
    const client_login = req.user.username
    const object_name = req.body.order_object_name
    const userObjects = await Object.find({ client_login, object_name });


    if (!(req.user.role === roles.admin || req.user.role === roles.master) && (!(req.user.username === req.body.order_client_login) || (userObjects.length === 0)) ) {
        req.flash('warning', 'Ошибка доступа');
        res.redirect('/');
        return;
    }
    
    const order = new Order(req.body);
    
    await order.save();
    req.flash(
    'success',
    `Заявка создана`
    );
    
    res.redirect('/orders/list');

    } catch (error) {
    next(error);
    }
});

//принятие заявки админом
router.post(
'/apply',
ensureAdmin,
async (req, res, next) => {
    
});


function ensureAdmin(req, res, next) {
if (req.user.role === roles.admin) {
    next();
} else {
    req.flash('warning', 'Нет доступа');
    res.redirect('/');
}
}

function ensureMaster(req, res, next) {
if (req.user.role === roles.master) {
    next();
} else {
    req.flash('warning', 'Нет доступа');
    res.redirect('/');
}
}
module.exports = router;