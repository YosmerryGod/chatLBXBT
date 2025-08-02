export async function askGemini(prompt) {
  const API_KEYS = [
    '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',
    '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',
    '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',
    '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',
    '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'
  ];

  const model = 'google/gemma-3-27b-it:free';

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
        continue; // langsung lanjut ke API key berikutnya tanpa retry
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
