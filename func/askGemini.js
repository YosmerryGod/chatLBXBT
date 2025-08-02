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
      console.warn(`⚠️ Gagal memanggil API Heroku. Status: ${response.status}`);
      return '⚠️ Tidak bisa terhubung ke LBXBT AI backend.';
    }

    const data = await response.json();
    return data.result || '⚠️ Tidak ada hasil dari LBXBT AI.';
  } catch (error) {
    console.error('❌ Error saat koneksi ke LBXBT backend:', error.message);
    return '❌ LBXBT AI error. Silakan coba lagi nanti 😓';
  }
}
