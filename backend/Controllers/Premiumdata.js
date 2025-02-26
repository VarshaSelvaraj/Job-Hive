const stripe = require("stripe")("sk_test_51QvgE2PttfWc6sY2ewvOg9axWMAtlENid66i2n435Uww7TA1mOXSqxCXCv86ICyoTEKi4TSiVZjGy91W4qvJP1hN00JO8o4rso");
const  supabase  = require("../config/supabaseClient");


const checkPremium = async (req, res) => {
  try {
    const { number } = req.params; 
console.log("number:", number);
   
    const { data, error } = await supabase
      .from("premiumdata")
      .select("number")  
      .eq("number", number)     
      .single();                

    if (error || !data) {
      console.error("User not found or error in query:", error);
      return res.status(404).json({ isPremium: false, message: "User does not have premium access" });
    }

   
    res.status(200).json({ isPremium: true, plan: data.plan, message: "User has premium access" });
  } catch (err) {
    console.error("Error checking premium status:", err);
    res.status(500).json({ isPremium: false, message: "Internal server error" });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { plan, email, number } = req.body;

   
    if (!plan || !email || !number) {
      return res.status(400).json({ error: "Plan, email, and number are required" });
    }

   
    const priceId = 'price_1QvtfnPttfWc6sY2hsaf3cJb'; 

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: priceId,  
        quantity: 1,
      }],
      success_url: 'http://localhost:5173/haspremium',  
      cancel_url: 'http://localhost:5173/getpremium',  
    });

    
    const { data, error } = await supabase
      .from("premiumdata")
      .upsert({ user: email, number }, { onConflict: ["number"] });  

    if (error) {
      console.error("❌ Error storing user data:", error.message);
      return res.status(500).json({ error: "Failed to store user data", details: error.message });
    }

   
    res.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("❌ Error creating checkout session:", err.message);
    res.status(500).json({ error: "Failed to create checkout session", details: err.message });
  }
};


module.exports = { checkPremium, createCheckoutSession };