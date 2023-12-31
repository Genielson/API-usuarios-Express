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


router.post('/signin', csrfCheck,async (req, res) => {
    try {
      const { email, senha } = req.body;
      if (!isEmail(email)) {
        return res.status(400).json({
          errors: [
            {
              mensagem: 'O email deve ser um email válido! ',
            },
          ],
        });
      }
      if (typeof senha !== 'string') {
        return res.status(400).json({
          errors: [
            {
              mensagem: 'A senha deve ser uma string ',
            },
          ],
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              mensagem: 'Usuário e/ou senha inválidos',
            },
          ],
        });
      }
      const userId = user._id;
  
      const passwordValidated = await bcrypt.compare(senha, user.senha);
      if (!passwordValidated) {
        return res.status(401).json({
          errors: [
            {
              mensagem: 'Usuário e/ou senha inválidos',
            },
          ],
        });
      }
  
      user.ultimo_login = new Date();
      await user.save();
  
      const session = await initSession(userId);
  
      res
        .cookie('token', session.token, {
          httpOnly: true,
          sameSite: true,
          maxAge: 1800000,
          secure: process.env.NODE_ENV === 'production',
        })
        .json({
          id:user.id,
          data_criacao: currentUser.data_criacao,
          data_atualizacao: currentUser.data_atualizacao,
          ultimo_login: currentUser.ultimo_login,
          csrfToken: session.csrfToken,
        });
    } catch (err) {
      res.status(401).json({
        errors: [
          {
            mensagem: 'Credenciais inválidas! Verifique o email e a senha. ',
          },
        ],
      });
    }
  });


router.post('/find', authenticate,csrfCheck, async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!isEmail(email)) {
        return res.status(400).json({
          errors: [
            {
              mensagem: 'O email deve ser válido! ',
            },
          ],
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              mensagem: 'Usuário não encontrado! ',
            },
          ],
        });
      }
  
      res.status(200).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
      });
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            mensagem: 'Algo de errado aconteceu durante o processo de busca. ',
          },
        ],
      });
    }
  });
  module.exports = router;
  