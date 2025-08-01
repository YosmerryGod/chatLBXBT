export async function getTopGainers(limit = 10) {
  const url = 'https://api.binance.com/api/v3/ticker/24hr';

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Filter hanya pair dengan USDT
    const usdtPairs = data.filter(item => item.symbol.endsWith('USDT'));

    // Urutkan berdasarkan persentase perubahan harga tertinggi
    const sorted = usdtPairs
      .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
      .slice(0, limit);

    // Mapping hasilnya
    return sorted.map(item => ({
      symbol: item.symbol,
      price: parseFloat(item.lastPrice).toFixed(4),
      changePercent: parseFloat(item.priceChangePercent).toFixed(2),
    }));

  } catch (error) {
    console.error('Gagal mengambil data top gainers dari Binance:', error);
    return [];
  }
}
