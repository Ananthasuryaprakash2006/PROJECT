export const aiChat = (req, res) => {
  const { messages } = req.body;

  const last = messages[messages.length - 1].text.toLowerCase();

  let reply = "I’m here to help!";

  if (last.includes("best fund") || last.includes("recommend"))
    reply = "Based on your profile, Bluechip & Flexi-cap funds usually provide stable long-term growth.";

  else if (last.includes("risk"))
    reply = "Low-risk funds include Liquid, Ultra-short, and Short-duration debt funds.";

  else if (last.includes("sip"))
    reply = "A SIP of ₹5000/month for 10 years in an equity fund may grow to ₹12–14 lakhs depending on returns.";

  else if (last.includes("portfolio"))
    reply = "A balanced portfolio typically mixes Equity (60%), Debt (30%), and Gold (10%).";

  else if (last.includes("tax"))
    reply = "ELSS mutual funds offer tax benefits under Section 80C with a 3-year lock-in.";

  res.json({ reply });
};
