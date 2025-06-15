const { askGeminiWithContext } = require('./func/askGemini');

// Fungsi fetch Dexscreener + kirim ke Gemini
export async function analyzeTokenFromDexscreener(chainId, pairId) {
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/${chainId}/${pairId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    });

    if (!res.ok) throw new Error('Failed to fetch from Dexscreener');

    const { pair } = await res.json();

    const prompt = `
You are a crypto DEX analyst. Based on the provided JSON data of a token on ${pair.chainId} (DEX: ${pair.dexId}), perform a concise analysis including:

1. 📈 Price Trend Summary:
- Is the price going up or down?
- What's the short-term (5m), mid-term (1h), and long-term (24h) trend?

2. 🔄 Trading Activity:
- Are buys > sells or vice versa?
- Is there healthy trading activity? Mention volume in USD.

3. 💧 Liquidity Health:
- Is the current liquidity good for trading safely?
- What's the liquidity in USD?

4. ⚠️ Risk Insight:
- Does the token seem risky (e.g., pump and dump)?
- Any signs of early profit-taking or abnormal activity?

5. 📊 Market Insight Summary:
- Include FDV, market cap, price in USD, and native price.
- Overall sentiment: “Bullish”, “Cautious”, or “Risky”.

Only use this raw JSON (no social media):

\`\`\`json
${JSON.stringify(pair, null, 2)}
\`\`\`

Format your response under 150 words with 2–3 emojis and bullet points.
`.trim();

    const analysis = await askGemini(prompt); // Fungsi Gemini yang kamu sudah punya
    return analysis || '⚠️ No response generated from Gemini.';
  } catch (err) {
    console.error('[analyzeTokenFromDexscreener] Error:', err.message);
    return '❌ Failed to analyze token data.';
  }
}
