import './style.css';
import liff from '@line/liff';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

liff
  .init({
    liffId: import.meta.env.VITE_LIFF_ID
  })
  .then(() => {
    app.innerHTML = `
    <h1>create-liff-app</h1>
    <p>LIFF init succeeded.</p>
  `;
  })
  .catch((error: Error) => {
    app.innerHTML = `
    <h1>create-liff-app</h1>
    <p>LIFF init failed.</p>
    <p><code>${error}</code></p>
  `;
  });
