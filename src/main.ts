import "./style.css";
import liff from "@line/liff";

const gas =
  "https://script.google.com/macros/s/AKfycbw6JSwI55IdgHKFo8RIShKfz4VTyAY9cJakDW_XGzL6VryOlVMnCLg1opKGyVmu-QHlgQ/exec";
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
    let location = "";
    for (const [key, value] of entries) {
      app.innerHTML += `<p>GET params: ${key}: ${value}</p>`;
      if (key === "location") {
        location = value;
      }
    }
    const body = JSON.stringify({
      lineId: line_id_token,
      location: location,
    });
    app.innerHTML += `<p>Body: ${body}</p>`;
    fetch(gas, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => {
        app.innerHTML += `<p>POST Success: ${res}</p>`;
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
