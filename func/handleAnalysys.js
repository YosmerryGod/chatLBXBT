const axios = require('axios');
const { askGemini } = require('../func/askGemini');

// Binance Futures public API endpoints
async function getOHLCV(symbol = 'BTCUSDT', interval = '1d', limit = 200) {
    const url = `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const res = await axios.get(url);
    return res.data;
}

async function getOrderBook(symbol = 'BTCUSDT', limit = 10) {
    const url = `https://fapi.binance.com/fapi/v1/depth?symbol=${symbol}&limit=${limit}`;
    const res = await axios.get(url);
    return res.data;
}

async function getFundingRate(symbol = 'BTCUSDT') {
    const url = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=1`;
    const res = await axios.get(url);
    return res.data[0];
}

// Fungsi hitung Pivot dan S/R levels
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

// Buat prompt untuk Gemini
async function createPrompt(symbol = 'BTCUSDT') {
    const ohlcv = await getOHLCV(symbol);
    const orderBook = await getOrderBook(symbol);
    const fundingRate = await getFundingRate(symbol);

    const textOHLCV = ohlcv.map(x =>
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
`;

    return `
You are a professional market futures AI analyst. Analyze the following data for ${symbol} and provide:
- Signal (BUY/SELL/HOLD) for swing and intraday.
- Suggested Entry, SL, TP.
- Use 2-3 emojis, max 150 words.

Market Data:
OHLCV:
${textOHLCV}

Order Book:
${textOrderBook}

Funding Rate: ${textFundingRate}

Pivot Levels:
${textLevels}

Your Analysis:
`;
}

// Fungsi utama
async function getGeminiAnalysis(symbol = 'ETHUSDT') {
    const prompt = await createPrompt(symbol);
    const analysis = await askGemini(prompt);
    return analysis;
}

// Jalankan langsung (Heroku / lok

module.exports = { getGeminiAnalysis };
