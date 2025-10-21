// const Stripe = require('stripe');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

// exports.createCheckoutSession = async (req, res) => {
  // try {
    // const { items } = req.body; // [{ name, price, quantity }]
    // const line_items = (items || []).map(p => ({
      // price_data: {
        //currency: 'clp',
        //product_data: { name: p.name },
        //unit_amount: Number(p.price) || 0, // CLP = sin decimales
      //},
      //quantity: Number(p.quantity) || 1,
    //}));

    // const session = await stripe.checkout.sessions.create({
      //mode: 'payment',
     // line_items,
      //success_url: `${process.env.FRONTEND_URL}/?success=1`,
      //cancel_url: `${process.env.FRONTEND_URL}/?cancel=1`,//
    //});

    //res.json({ ok: true, url: session.url });
  //} catch (err) {
    //console.error(err);
   // res.status(500).json({ ok: false, message: 'No se pudo crear la sesión de pago' });
  //}
//};
