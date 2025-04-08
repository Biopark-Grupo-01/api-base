import jsonwebtoken from 'jsonwebtoken';

export const generate = (req, res, next) => {
  if(!req.user) {
    return res.UNAUTHORIZED();
  }

  const payload = {
    email: req.user.email,
  };

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

  const token = jsonwebtoken.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  res.OK({
    token,
  });
}

export const verify = (req, res, next) => {
  /* 
    #swagger.autoHeaders = false
    #swagger.security = [{ 
      "bearerAuth": {}
    }]
  */
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.UNAUTHORIZED();
  }

  const token = authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  jsonwebtoken.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.UNAUTHORIZED();
    }

    res.payload = payload;
    return next();
  });
}
