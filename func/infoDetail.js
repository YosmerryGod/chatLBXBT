function informationBean() {
  const now = new Date();
  const singaporeOffset = 8 * 60; // UTC+8 (Singapore)
  const localOffset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() + (singaporeOffset + localOffset) * 60 * 1000);
  const hour = localTime.getHours();

  const isResting = hour >= 23 || hour < 7;
  const status = isResting ? "is resting now. 💤" : "is probably analyzing markets and building. 🧠⚙️";

  return `

💠 PROJECT: LBXBT — AI-Driven Intelligence for BSC 💠

🧑‍💻 Developer: Satochi (Singapore)
🤖 Assistant: LBXBT AI
🌍 Chain: BNB Smart Chain (BEP-20)

🧠 LBXBT is a smart AI Agent built for the Binance Smart Chain. It tracks tokens, detects patterns, and learns from market behavior. Our mission is to simplify crypto intelligence for everyone — fast, friendly, and freakishly insightful.

🚀 Launch Status: In Development
💰 Token Supply: 1 Billion
🔁 Tax Buy/Sell: 0%
🔥 Liquidity: Burned
❌ Ownership: Renounced
👥 Community Allocation: 100%

🔗 Token Info:
- 🪙 Token Name: LBXBT
- 🔗 Chain: Binance Smart Chain (BSC)
- 📜 Contract Address: (to be announced)

🔒 Security & Transparency:
- ✅ Contract will be verified
- 🔐 Liquidity burned forever
- ❌ Renounced ownership
- 🔍 Open-source contract logic

🧠 AI System:
LBXBT AI is powered by LIL BEAN — handling:
- Token analysis requests
- Market trend summarization
- Chat interaction & moderation logic
- Meme logic & vibes sync

🎁 Features:
- ⚡ Instant token analysis (by symbol or pair)
- 📈 Trending token scanner
- 💬 AI chat companion
- 📊 Market dashboard with gainers/losers
- 🧠 Self-learning prompt engine

📌 Roadmap:

✅ Phase 1 – Genesis
• Mascot finalized
• Community formed on X
• Website launched
• Launch $LBXBT Token on four.meme
• Deploy AI Agent v1.0

🚧 Phase 2 – Expansion
• Launch $LBXBT Token
• Release AI Agent to public web
• Telegram Bot (LBXBT Scout)
• Trending Token Panel
• Meme Gallery Integration
• Portfolio Viewer
• Meme Contest Campaign

🔲 Phase 3 – Ecosystem
• LBXBT DApp launch
• Staking module (APR / APY)
• Swap integration
• AI Token Analyzer 2.0
• Trending Scanner
• Mobile / PWA version
• CEX listing preparation
• 1st CEX listing (TBD)


🎯 Core Focus:
- Fast & intelligent token scanning
- Zero-friction UX
- AI + DeFi integration
- Meme culture + Data tools

📣 Channels:
- Website: https://lbxbt.tech
- Telegram: 
- Twitter/X: https://x.com/LilbeanBSC

🤖 Who are you?
I’m **LBXBT AI** — your 24/7 token analyst assistant for the LBXBT ecosystem. I reply with alpha, memes, and sometimes chaos.

👥 Team Status (Singapore Time):
👑 t.me/satotchiDEV ~> Dev ${status}
🛠️ t.me/neurobean ~> Assistant Bot (always online)
🛡️ t.me/lbxbtmods ~> Moderator Group

📜 Disclaimer:
LBXBT is a decentralized experimental project focused on AI-powered tools for DeFi. Not financial advice.

  `;
}

export { informationBean };
