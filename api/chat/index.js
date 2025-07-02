const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

module.exports = async function (context, req) {
  if (!req.body || !req.body.message) {
    context.res = {
      status: 400,
      body: { error: "Please send a message in the request body." }
    };
    return;
  }

  const userMessage = req.body.message;

  const fetch = require('node-fetch');

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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

  if (!openaiResponse.ok) {
    const error = await openaiResponse.text();
    context.res = { status: 500, body: { error: error } };
    return;
  }

  const openaiData = await openaiResponse.json();

  context.res = {
    status: 200,
    body: { response: openaiData.choices[0].message.content }
  };
};
