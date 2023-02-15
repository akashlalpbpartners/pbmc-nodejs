function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    return res.sendStatus(401);
  }
  jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = AuthenticateToken