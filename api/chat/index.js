const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log("Chat function received a request.");

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    context.res = {
      status: 500,
      body: { error: "OpenAI API key not configured." }
    };
    return;
  }

  if (!req.body || !req.body.message) {
    context.res = {
      status: 400,
      body: { error: "Please send a message in the request body." }
    };
    return;
  }

  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenAI API error");
    }

    const reply = data.choices[0].message.content;

    context.res = {
      status: 200,
      body: { reply }
    };

  } catch (error) {
    context.res = {
      status: 500,
      body: { error: error.message }
    };
  }
};
