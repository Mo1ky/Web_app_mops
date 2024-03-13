const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');



const OrderSchema = new mongoose.Schema({
    order_object_name: {
        type: String,
        required: true,
    },
    order_client_login: {
        type: String,
        required: true,
    },
    order_master_login: {
        type: String,
        default: ' ',
    },
    client_comment: {
        type: String,
    },
    decline_reason: {
        type: String,
    },
    equipment_type: {
        type: String,
        required: true,
    },
    work_type: {
        type: String,
        required: true,
    },
    order_status: {
        type: String,
        default: 'Новая заявка',
    },
});


const Order = mongoose.model('order', OrderSchema);
module.exports = Order;