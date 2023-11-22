const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,

  },
  
  
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    minlength: 8,
  },

  telefones: [{
    numero: {
      type: String,
      required: false,
    },
    ddd: {
      type: String,
      required: false,
    },
    required: false,
  }],
  
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: null, 
  },

});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt
    .genSalt(12)
    .then((salt) => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

module.exports = mongoose.model('User', UserSchema);
