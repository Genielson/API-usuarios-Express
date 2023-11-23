const Session = require('../models/session');
const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (typeof token !== 'string') {
      
      res.status(401).json({
        errors: [
          {
            mensagem: 'Sessão inválida',
          },
        ],
      });
    }
    const session = await Session.findOne({ token, status: 'valid' });
    if (!session) {
      res.clearCookie('token');
      
      res.status(401).json({
        errors: [
          {
            mensagem: 'Sessão inválida',
          },
        ],
      });

    }
    req.session = session;
    next();
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          mensagem: 'Não autorizado',
        },
      ],
    });
  }
};

module.exports = { authenticate };
