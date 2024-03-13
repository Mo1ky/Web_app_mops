const { body, check } = require('express-validator');

module.exports = {
  registerValidator: [
    body('username')
      .notEmpty()
      .isLength({min: 4, max: 20}),
    body('password')
      .notEmpty()
      .isLength({min: 6})
      .custom((value, { req }) => {
      return true;
    }),
  ],

  objectValidator: [
    body('object_name')
      .notEmpty()
      .isLength({min: 4}),
    body('adress')
      .notEmpty()
      .isLength({min: 4}),
    body('inn')
      .notEmpty()
      .isLength({min: 6}),
    body('client_login')
      .notEmpty()
      .isLength({min: 4, max: 20}),
    body('fio_object_contact')
      .notEmpty()
      .isLength({min: 3}),
    body('job_object_contact')
      .notEmpty()
      .isLength({min: 6}),
    body('phone_object_contact')
      .notEmpty()
      .custom((value, { req }) => {
        return true;
    })
  ],
  orderValidator: [
    body('order_object_name')
      .notEmpty()
      .isLength({min: 4}),
    body('order_client_login')
      .notEmpty()
      .isLength({min: 4, max: 20}),
    body('equipment_type')
      .notEmpty()
      .isLength({min: 3}),
    body('work_type')
      .notEmpty()
      .isLength({min: 3})
      .custom((value, { req }) => {
        return true;
    })
  ],
};
