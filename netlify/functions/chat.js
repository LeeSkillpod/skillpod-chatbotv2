
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  try {
    const { message } = JSON.parse(event.body);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = response.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("OpenAI API error:", error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Sorry, something went wrong. Please try again." }),
    };
  }
};
