const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { authenticate } = require('../middleware/authenticate');
const { csrfCheck } = require('../middleware/csrfCheck');
const { initSession, isEmail } = require('../utils/utils');

const router = express.Router();

router.post('/signup', csrfCheck, async (req, res) => {

  try {
    const { email, senha, nome, telefones } = req.body;
    if (!isEmail(email)) {
      return res.status(400).json({
        errors: [
          {
            mensagem: 'O email deve ser válido! ',
          },
        ],
      });
    }
    if (typeof senha !== 'string') {
      return res.status(400).json({
        errors: [
          {
            mensagem: 'A senha deve ser uma string! ',
          },
        ],
      });
    }

    const repeatUser = await User.findOne({ email });
    if (repeatUser) {
      return res.status(400).json({
        errors: [
          {
            mensagem: 'E-mail já existente! ',
          },
        ],
      });
    }


    const user = new User({ email, senha, nome, telefones });
    const persistedUser = await user.save();
    const userId = persistedUser._id;

    const session = await initSession(userId);
    const currentUser = await User.findOne({ email });

    res
      .cookie('token', session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1800000,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(201)
      .json({
        id: currentUser.id,
        data_criacao: currentUser.data_criacao,
        data_atualizacao: currentUser.data_atualizacao,
        ultimo_login: currentUser.ultimo_login,
        csrfToken: session.csrfToken,
      });

  } catch (err) {
    res.status(400).json({
      errors: [
        {
          mensagem: "Erro ao registrar! Verifique se inseriu todos os parametros. ",
        },
      ],
    });
  }
});