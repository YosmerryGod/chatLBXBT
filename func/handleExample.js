// import translate from 'google-translate-api-x'; ❌ hapus dulu
import { askGemini } from './askGemini.js';
import { informationBean } from './infoDetail.js';
import { getGeminiAnalysis } from './handleAnalysys.js';

function boldifyLabels(text) {
  const labels = ['Swing:', 'Intraday:', 'Entry', 'SL', 'TP'];
  labels.forEach(label => {
    const regex = new RegExp(`\\b(${label})`, 'gi');
    text = text.replace(regex, '**$1**');
  });
  return text;
}


function detectLanguage(messageText) {
  if (/[一-龥]/.test(messageText)) return 'zh-CN';
  if (/[ぁ-んァ-ン]/.test(messageText)) return 'ja';
  return 'en';
}

async function detectCategory(processedText, mainCategories) {
  const prompt = `
You are a helpful AI. Analyze the question: "${processedText}".
Identify the most accurate category from this list:
${mainCategories.join(', ')}.

- "ask about project" is for questions related to the project, such as tokenomics, partnerships, supply, liquidity, contract, etc.
- "ask bot" is for questions about the bot’s functions, features, issues, or settings.
- "proposal" is for messages offering services, help, collaborations, or new ideas.
- "others" is for messages that do not match any category above.
- "greeting" is for simple greetings like "hi", "hello", "good morning", or "hey".
- "compliment" is for messages praising the bot, project, or community.

If no category matches, return exactly "others". No explanations, just return the category.
  `;
  try {
    const result = await askGemini(prompt);
    return result.trim().toLowerCase();
  } catch (error) {
    console.error(`[CategoryDetect] Error:`, error.message);
    return 'others';
  }
}

export async function handleMSG1(messageText) {
  let processedText = messageText;
  const detectedLanguage = detectLanguage(messageText);

  const mainCategories = [
    'ask about project', 'ask bot', 'proposal',
    'others', 'greeting', 'compliment', 'analysis crypto'
  ];

  const category = await detectCategory(processedText, mainCategories);
  let prompt = '';

  // Dapatkan informasi proyek (pakai await kalau async)
  const info = await informationBean();

  // Buat prompt jika BUKAN permintaan analisis crypto
  if (category !== 'analysis crypto') {
    prompt = `You are a smart and friendly assistant named **LBXBT**. Based on the user's message, follow these instructions:

1. If the user greets you (e.g. "Hi", "Hello"), respond with a cheerful and fun greeting (max 20 words).

2. If the user compliments you, respond with appreciation and a playful tone (max 20 words).

3. If the user asks about the LBXBT project or about yourself, use the following info:
${info}
Respond in a chill and informative tone (max 50 words).

4. If the user asks for a crypto market analysis but does not mention a specific token or pair, ask them:  
"Sure! Which market would you like me to analyze? (e.g. BTCUSDT)"

5. For all other general questions, reply helpfully and clearly. Keep responses under 500 words, and match the tone of a helpful AI assistant with personality.

Now here is the user's message:
"${messageText}"`;
  }

  try {
    let responMessage = '';

    if (category === 'analysis crypto') {
      const extractSymbolPrompt = `
Your task is to extract the cryptocurrency name from the following text and return its USDT trading pair symbol, following these rules:

1. If the token is one of: pepe, shib, x, xec, floki, bonk, lunc, rats, sats → prefix the symbol with "1000"
2. If the token is: mog or bob → prefix the symbol with "1000000"
3. For any other token, use the standard symbol (no prefix)
4. Return the result in full uppercase and only in the format: [SYMBOL]USDT
5. Do not include any explanation or extra text — just the symbol.

Examples:
- "analyze pepe" → 1000PEPEUSDT  
- "show me bob" → 1000000BOBUSDT  
- "eth analysis" → ETHUSDT

Text: "${processedText}"

Answer:
`.trim();

      const symbol = await askGemini(extractSymbolPrompt);

      // Tambahan pengecekan kalau simbol tidak valid
      if (!symbol || !symbol.includes('USDT')) {
        return 'Sorry, I couldn’t detect the token name.';
      }

      responMessage = await getGeminiAnalysis(symbol);
    }

    // Jika bukan analysis, proses prompt biasa
    if (prompt && category !== 'analysis crypto') {
      responMessage = await askGemini(prompt);
    }

    // Tambahkan bold untuk label seperti Entry, SL, dll.
    responMessage = boldifyLabels(responMessage);

    return responMessage || "I'm not sure how to respond to that. Try asking something else?";
  } catch (e) {
    console.error('❌ Error generating response:', e.message);
    return 'Sorry, I couldn’t process that.';
  }
}


export async function handleMessage0(messageText) {
  try {
    const analysa = await handleMSG1(messageText); // get analysis content
    const prompt = `
You are a smart and friendly assistant named **LBXBT**. Based on the user's message, follow these instructions:

1. If the user greets you (e.g. "Hi", "Hello"), respond with a cheerful and fun greeting (max 20 words).

2. If the user compliments you, respond with appreciation and a playful tone (max 20 words).

3. If the user asks about the LBXBT project or about yourself, use the following info:\n${informationBean()}\nRespond in a chill and informative tone (max 50 words).

4. If the user asks for a crypto market analysis but does not mention a specific token or pair, ask them:  
"Sure! Which market would you like me to analyze? (e.g. BTCUSDT)"

5. If the user requests a crypto market analysis and mentions a specific pair (e.g. BTCUSDT, ETHUSDT, etc.), respond using the following analysis content:\n${analysa}\nFormat your response in a chill, informative tone.  
Start with a friendly intro like "Here's what I found for you 👇", then summarize the analysis clearly (max 250 words). Avoid repeating the token name unnecessarily.

6. For all other general questions, reply helpfully and clearly. Keep responses under 500 words, and match the tone of a helpful AI assistant with personality.

Now here is the user's message:
"${messageText}"

Respond accordingly by following the rules above.
    `.trim();

    const aiResponse = await askGemini(prompt);
    return aiResponse;
  } catch (error) {
    console.error('handleMessage0 error:', error);
    return "Oops... something went wrong while processing your message 😓";
  }
}
