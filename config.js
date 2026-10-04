/* ==========================================================================
   TRAVU - RUNTIME CONFIGURATION
   Allows environment key injection or runtime user input via Settings UI
   ========================================================================== */

const CONFIG = {
  // Leave empty by default so users can input securely via Settings UI or deployment env
  GEMINI_API_KEY: window.ENV_GEMINI_API_KEY || "",
  DEFAULT_MODEL: "gemini-1.5-flash-latest",
  API_BASE_URL: "https://generativelanguage.googleapis.com"
};

// Expose helper to retrieve active API Key from localStorage or config
function getActiveGeminiApiKey() {
  const savedKey = localStorage.getItem("travu_gemini_api_key");
  if (savedKey && savedKey.trim()) {
    return savedKey.trim();
  }
  return CONFIG.GEMINI_API_KEY.trim();
}

function setActiveGeminiApiKey(key) {
  if (key) {
    localStorage.setItem("travu_gemini_api_key", key.trim());
  } else {
    localStorage.removeItem("travu_gemini_api_key");
  }
}
