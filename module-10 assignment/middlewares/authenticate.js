const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authenticate;
