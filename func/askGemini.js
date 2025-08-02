export async function askGemini(prompt) {
  const API_KEYS = [
    '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',
    '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',
    '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',
    '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',
    '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',
    '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'
  ];

  const model = 'qwen/qwen3-30b-a3b-instruct-2507';

  for (const key of API_KEYS) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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

      if (!res.ok) {
        console.warn(`⚠️ Key ${key.slice(-6)} gagal. Status: ${res.status}`);
        continue;
      }

      const data = await res.json();
      if (data.choices?.length > 0) {
        console.log(`✅ Sukses dengan key ${key.slice(-6)}`);
        return data.choices[0].message.content.trim();
      } else {
        console.warn(`⚠️ Respon kosong dengan key ${key.slice(-6)}`);
      }

    } catch (err) {
      console.error(`❌ Error dengan key ${key.slice(-6)}:`, err.message);
      continue;
    }
  }

  return '❌ LBXBT MODEL error. Please try again later 😓';
}
