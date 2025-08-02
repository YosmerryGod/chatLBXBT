export async function askGemini(prompt) {
  const API_KEYS = [
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
