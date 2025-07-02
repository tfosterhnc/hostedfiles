import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function (context, req) {
  if (req.method !== "POST") {
    context.res = {
      status: 405,
      body: { error: "Method not allowed" },
    };
    return;
  }

  const { message } = req.body;

  if (!message) {
    context.res = {
      status: 400,
      body: { error: "No message provided." },
    };
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are the Healthy North Coast Smart Assistant." },
        { role: "user", content: message },
      ],
    });

    context.res = {
      status: 200,
      body: { reply: completion.choices[0].message.content },
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: "Something went wrong." },
    };
  }
};
