export async function askGemini(prompt) {
  const GEMINI_API_KEYS = [
    { key: 'AIzaSyDH5dAhlgANLpoN7lEeanpMspH5QoFloSw', model: '1.5-flash' }
  ];

  for (const { key, model } of GEMINI_API_KEYS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-${model}:generateContent?key=${key}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await res.json();
      const candidates = data.candidates;
      if (candidates && candidates.length > 0) {
        return candidates[0].content.parts[0].text.trim();
      } else {
        return `Hmm... no response from NeuroBean 😅`;
      }
    } catch (err) {
      console.error(`Gemini ${model} Error:`, err);
    }
  }

  return 'Oops... all NeuroBean models failed 😅';
}
