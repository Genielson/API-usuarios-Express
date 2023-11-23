const csrfCheck = async (req, res, next) => {
    try {
      const { csrfToken } = req.session;
      const receivedCsrfToken = req.headers['csrf-token'];
      if (!receivedCsrfToken || csrfToken !== receivedCsrfToken) {
        res.status(400).json({
          errors: [
            {
              mensagem: 'CSRF providenciado é invalido! ',
            },
          ],
        });
      }
      next();
    } catch (err) {
      res.status(401).json({
        errors: [
          {
            mensagem: 'CSRF não autorizado',
          },
        ],
      });
    }
  };
  
  module.exports = { csrfCheck };
  