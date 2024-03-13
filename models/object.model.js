const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');

const ObjectSchema = new mongoose.Schema({
    object_name: {
        type: String,
        required: true,
        unique: true,
    },
    adress: {
        type: String,
        required: true,
    },
    inn: {
        type: String,
        required: true,
    },
    client_login: {
        type: String,
        required: true,
    },
    fio_object_contact: {
        type: String,
        required: true,
    },
    job_object_contact: {
        type: String,
        required: true,
    },
    phone_object_contact: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    
});


const Object = mongoose.model('object', ObjectSchema);
module.exports = Object;