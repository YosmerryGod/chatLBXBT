import { askGemini } from './askGemini.js';

// Ambil data OHLCV Binance Futures
async function getOHLCV(symbol = 'BTCUSDT', interval = '1d', limit = 200) {
  const url = `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch OHLCV');
  return await res.json();
}

// Ambil orderbook teratas (Top Bid/Ask)
async function getOrderBook(symbol = 'BTCUSDT', limit = 10) {
  const url = `https://fapi.binance.com/fapi/v1/depth?symbol=${symbol}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch order book');
  return await res.json();
}

// Ambil funding rate terakhir
async function getFundingRate(symbol = 'BTCUSDT') {
  const url = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch funding rate');
  const data = await res.json();
  return data[0];
}

// Hitung Pivot Points & Support/Resistance
function calculatePivotLevels(latestCandle) {
  const high = parseFloat(latestCandle[2]);
  const low = parseFloat(latestCandle[3]);
  const close = parseFloat(latestCandle[4]);
  const pivot = (high + low + close) / 3;

  const r1 = (2 * pivot) - low;
  const r2 = pivot + (high - low);
  const r3 = high + 2 * (pivot - low);

  const s1 = (2 * pivot) - high;
  const s2 = pivot - (high - low);
  const s3 = low - 2 * (high - pivot);

  return { pivot, r1, r2, r3, s1, s2, s3 };
}

// Buat prompt untuk Gemini AI berdasarkan data pasar
async function createPrompt(symbol = 'BTCUSDT') {
  const [ohlcv, orderBook, fundingRate] = await Promise.all([
    getOHLCV(symbol),
    getOrderBook(symbol),
    getFundingRate(symbol)
  ]);

  const textOHLCV = ohlcv.slice(-5).map(x =>
    `Open: ${x[1]}, High: ${x[2]}, Low: ${x[3]}, Close: ${x[4]}, Volume: ${x[5]}`
  ).join('\n');

  const textOrderBook = `Top Bid: ${orderBook.bids[0]?.[0] || 'N/A'}, Top Ask: ${orderBook.asks[0]?.[0] || 'N/A'}`;
  const textFundingRate = fundingRate?.fundingRate || 'N/A';

  const latestCandle = ohlcv[ohlcv.length - 1];
  const levels = calculatePivotLevels(latestCandle);
  const textLevels = `
Pivot: ${levels.pivot.toFixed(5)}
Resistance 1: ${levels.r1.toFixed(5)}
Resistance 2: ${levels.r2.toFixed(5)}
Resistance 3: ${levels.r3.toFixed(5)}
Support 1: ${levels.s1.toFixed(5)}
Support 2: ${levels.s2.toFixed(5)}
Support 3: ${levels.s3.toFixed(5)}
  `.trim();

 return `
You are a professional crypto futures analyst AI. Based on the data below, provide:

1. Overall Signal:
   - Swing: BUY / SELL / HOLD
   - Intraday: BUY / SELL / HOLD

2. Key Levels:
   - Pivot
   - Resistance 1–3
   - Support 1–3

3. Entry Strategy:
   - Swing Trade:
     • Entry:
     • SL:
     • TP:
   - Intraday Trade:
     • Entry:
     • SL:
     • TP:

4. Use max 150 words. Add 2–3 relevant emojis. Be clean, use line breaks and bullet points. Format clearly for readability.

Data:
OHLCV (Last 5):
${textOHLCV}

Order Book:
${textOrderBook}

Funding Rate:
${textFundingRate}

Pivot Levels:
${textLevels}

Your Analysis:
`.trim();
}

// Fungsi utama: dapatkan analisis dari Gemini AI
export async function getGeminiAnalysis(symbol = 'BTCUSDT') {
  try {
    const prompt = await createPrompt(symbol);
    const analysis = await askGemini(prompt);
    return analysis || '⚠️ No response generated.';
  } catch (error) {
    console.error('[getGeminiAnalysis] Error:', error.message);
    return '❌ Failed to analyze market data.';
  }
}
