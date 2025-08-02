export async function askGemini(prompt) {
  try {
    const response = await fetch('https://lbxbt-api-backend-f8fe910f5402.herokuapp.com/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to contact LBXBT API. Status: ${response.status}`);
      return '⚠️ Unable to connect to the LBXBT AI backend.';
    }

    const data = await response.json();
    return data.result || '⚠️ No response returned from LBXBT AI.';
  } catch (error) {
    console.error('❌ Error connecting to LBXBT backend:', error.message);
    return '❌ An error occurred while connecting to LBXBT AI. Please try again later.';
  }
}
