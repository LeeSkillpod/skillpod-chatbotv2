// netlify/functions/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, context) => {
  try {
    const body = await req.json();

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo" if needed
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: body.message },
      ],
    });

    return new Response(
      JSON.stringify({ reply: chatCompletion.choices[0].message.content }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ reply: "Sorry, something went wrong." }),
      { status: 500 }
    );
  }
};
