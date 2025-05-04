async function checkPrompt() {
  const prompt = document.getElementById('prompt').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "Checking...";

  const res = await fetch('https://api.languagetoolplus.com/v2/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      text: prompt,
      language: 'en-US'
    })
  });

  const data = await res.json();

  if (data.matches.length === 0) {
    resultDiv.innerHTML = `<p style="color:green;">✅ Prompt accepted. It will be sent to the image generator.</p>`;
    // Simuler génération d’image ici si besoin
  } else {
    resultDiv.innerHTML = `<p style="color:red;">❌ Prompt rejected. Please fix the following issues:</p><ul>` +
      data.matches.map(m => `<li>${m.message}</li>`).join('') + '</ul>';
  }
}
