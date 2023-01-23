const joi = require('joi');

const joiSchemaLogin = joi.object({
    email: joi.string()
              .email()
              .required(),
    password: joi.string()
                 .min(6)
                 .required(),
});

module.exports = {
    joiSchemaLogin
};

// const validateLogin = async (req, res, next) => {
//     const { error } = joiSchema.validate(req.body);

//     if (error) {
//         return res.status(404).json({ message: 'Login inválido' })
//     }
// }


// message: error.details[0].message (mensagem dinamica)
