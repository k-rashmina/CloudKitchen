const Stripe = require("stripe");

exports.createCheckoutSession = async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.map((item) => ({
        price_data: {
          currency: "lkr",
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Session Error:", error);
    res.status(500).json({ error: "Something went wrong creating session" });
  }
};
