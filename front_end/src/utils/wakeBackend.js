// ANATOME - Sidharth Mantri, Pranav Arun Pillai, Rishi Tadi
// Note: this code was generated with AI assistance (Claude). See README.

// The API runs on Render's free tier, which sleeps after ~15 idle minutes
// and takes 30-60s to boot. Netlify's /api proxy gives up after ~26s and
// answers with a plain-text 504, so the first AI call after a quiet spell
// failed. We poll the cheap health check until the server is up, and only
// then send the real request (retrying a POST could save a report twice).

let ready = null;

export function wakeBackend() {
  if (!ready) {
    ready = (async () => {
      const deadline = Date.now() + 120_000;
      while (Date.now() < deadline) {
        try {
          const response = await fetch("/api/health", { signal: AbortSignal.timeout(30_000) });
          if (response.ok) return;
        } catch {
          // proxy timed out or network blip, try again
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
      throw new Error("The server is taking too long to start. Please try again in a minute.");
    })();
    // let a later call try again instead of failing forever
    ready.catch(() => {
      ready = null;
    });
  }
  return ready;
}
