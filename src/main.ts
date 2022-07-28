import "./style.css";
import liff from "@line/liff";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycby-pAmYYAa8uYVA06dUi2zx9A5Bw2SkVatoVm9GWl3IEPN9qzoZg2UnFIBgNJVIIX_tWw/exec";
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
    let sub = "Unknown";
    if (line_decoded_id) {
      sub = line_decoded_id.sub ?? "Unknown";
    }
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
    // const body = JSON.stringify({
    //   lineId: sub,
    //   location: location,
    // });
    const body = `?lineId=${sub}&location=${location}`;
    app.innerHTML += `<p>Body: ${body}</p>`;
    fetch(GAS_URL + body, {
      method: "GET",
      mode: "no-cors",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "text/plain",
      },
      // body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        app.innerHTML += `<p>GET Success: ${json}</p>`;
      })
      .catch((err) => {
        app.innerHTML += `<p>GET Error: ${err}</p>`;
      });
  })
  .catch((error: Error) => {
    app.innerHTML = `
    <h1>LIFF init failed.</h1>
    <p><code>${error}</code></p>
  `;
  });
