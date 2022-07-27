import "./style.css";
import liff from "@line/liff";

const app = document.querySelector<HTMLDivElement>("#app") as HTMLDivElement;
const url = new URL(window.location.href);

liff
  .init({
    liffId: import.meta.env.VITE_LIFF_ID,
  })
  .then(() => {
    app.innerHTML = `
    <h1>LIFF init succeeded.</h1>
  `;
    const line_id_token = liff.getIDToken();
    app.innerHTML += `<p>LINE ID: ${line_id_token}</p>`;
    app.innerHTML += `<p>LINE Profile: ${JSON.stringify(
      liff.getProfile()
    )}</p>`;
    const entries = url.searchParams.entries();
    for (const [key, value] of entries) {
      app.innerHTML += `<p>GET params: ${key}: ${value}</p>`;
    }
    fetch(
      "https://script.google.com/macros/s/AKfycbwr9TdqeMzce8HS3B4EEa2Fx6cJ6K-LaBUjBmY6gNzidcdLhyvf5-MSGlMy_9D7VswyMA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineId: line_id_token,
          getParams: entries,
        }),
      }
    )
      .then((res) => {
        app.innerHTML += `<p>POST Success: ${res.status}</p>`;
      })
      .catch((err) => {
        app.innerHTML += `<p>POST Error: ${err}</p>`;
      });
    // liff
    //   .scanCodeV2()
    //   .then((result) => {
    //     app.innerHTML += `
    //   <p>Scan result: ${result.value}</p>
    // `;
    //   })
    //   .catch((err) => {
    //     app.innerHTML += `
    //   <p>Scan failed: ${err}</p>
    // `;
    //   });
  })
  .catch((error: Error) => {
    app.innerHTML = `
    <h1>LIFF init failed.</h1>
    <p><code>${error}</code></p>
  `;
  });
