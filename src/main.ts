import "./style.css";
import liff from "@line/liff";

const gas =
  "https://script.google.com/macros/s/AKfycbxmTntgMl8tjnXGelOOUmmSBzwlIMo5bykJSrLsTvVHBrCpS0ZXNdh9IWe78PUsSA8Z2g/exec";
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
    const line_decoded_id = liff.getDecodedIDToken();
    app.innerHTML += `<p>Decoded LINE ID: ${JSON.stringify(
      line_decoded_id
    )}</p>`;
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
      lineId: line_decoded_id.sup ?? "Unknown",
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
        app.innerHTML += `<p>POST Success: ${res.status}</p>`;
        return res.json();
      })
      .then((json) => {
        if (json.message) {
          app.innerHTML += `<p>JSON: ${json.message}</p>`;
        }
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
