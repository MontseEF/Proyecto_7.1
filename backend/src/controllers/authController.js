const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Demo user
  const demo = { id: '1', username: 'admin', hash: bcrypt.hashSync('admin123', 10) };
  const ok = username === demo.username && bcrypt.compareSync(password, demo.hash);
  if (!ok) return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });

  const token = jwt.sign({ id: demo.id, username: demo.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ ok: true, data: { user: { id: demo.id, username: demo.username }, token } });
};
