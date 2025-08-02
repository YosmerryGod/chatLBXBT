import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  const { prompt } = req.body;
  const model = 'qwen/qwen3-30b-a3b-instruct-2507';
  const keys = [
    process.env.API_KEY1,
    process.env.API_KEY2,
    process.env.API_KEY3
  ];

  for (const key of keys) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) continue;
      const data = await response.json();
      const message = data?.choices?.[0]?.message?.content?.trim();
      if (message) return res.status(200).json({ result: message });
    } catch (err) {
      console.error('API Error:', err.message);
    }
  }

  return res.status(500).json({ error: 'All API keys failed.' });
}
