exports.getAllProducts = (_req, res) => {
  res.json({
    ok: true,
    data: [
      { id: 1, name: 'Martillo Carpintero', price: 12990, image: '/uploads/martillo.jpg' },
      { id: 2, name: 'Destornillador Phillips', price: 4990, image: '/uploads/destornillador.jpg' },
      { id: 3, name: 'Taladro Percutor', price: 69990, image: '/uploads/taladro.jpg' }
    ]
  });
};
