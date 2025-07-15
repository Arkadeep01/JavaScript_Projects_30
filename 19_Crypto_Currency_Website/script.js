    async function fetchPrices() {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd';
      const response = await fetch(url);
      const data = await response.json();

      document.getElementById('btcPrice').textContent = '$' + data.bitcoin.usd.toLocaleString();
      document.getElementById('ethPrice').textContent = '$' + data.ethereum.usd.toLocaleString();
      document.getElementById('dogePrice').textContent = '$' + data.dogecoin.usd.toLocaleString();
    }


    fetchPrices();
    setInterval(fetchPrices, 30000);