const { verify } = require("../utils/jwt");

function auth(req, res, next) {
  try {
    const hdr = req.headers.authorization || "";
    const [, token] = hdr.split(" ");
    if (!token) return res.status(401).json({ message: "Token requerido" });
    const payload = verify(token);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = { auth };