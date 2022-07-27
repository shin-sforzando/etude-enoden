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
    <h1>create-liff-app</h1>
    <p>LIFF init succeeded.</p>
  `;
    for (const [key, value] of url.searchParams.entries()) {
      app.innerHTML += `<p>${key}: ${value}</p>`;
    }
    liff
      .scanCodeV2()
      .then((result) => {
        app.innerHTML += `
      <p>Scan result: ${result.value}</p>
    `;
      })
      .catch((err) => {
        app.innerHTML += `
      <p>Scan failed: ${err}</p>
    `;
      });
  })
  .catch((error: Error) => {
    app.innerHTML = `
    <h1>create-liff-app</h1>
    <p>LIFF init failed.</p>
    <p><code>${error}</code></p>
  `;
  });
