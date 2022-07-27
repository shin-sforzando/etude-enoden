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
    app.innerHTML += `<p>LINE ID: ${liff.getIDToken()}</p>`;
    app.innerHTML += `<p>LINE Profile: ${JSON.stringify(liff.getProfile())}</p>`;
    const entries = url.searchParams.entries();
    for (const [key, value] of entries) {
      app.innerHTML += `<p>GET params: ${key}: ${value}</p>`;
    }
    fetch(
      "https://script.google.com/macros/s/AKfycbxgJ2Si33O8FeckeivMkMJ4MDuv4g-_U41E4rC5EkbH3ubiYvjydDVDXu2ga9MqXxW5IA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineId: liff.getIDToken(),
          lineProfile: liff.getProfile(),
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
