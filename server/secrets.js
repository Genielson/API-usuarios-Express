const secrets = {
    dbUri: process.env.DB_URI || 'SUA API KEY',
  };
  
  const getSecret = (key) => secrets[key];
  
  module.exports = { getSecret };
  