/* ==========================================================================
   TRAVU - GOOGLE GEMINI AI INTEGRATION ENGINE
   Auto-Discovery via ListModels, Adaptive Fallbacks & Flexible Custom Model
   ========================================================================== */

const GeminiAI = {
  lastPrompt: "",
  lastRawResponse: null,
  lastError: null,
  discoveredModels: [],

  // Clean JSON response from potential markdown code fences
  sanitizeJsonResponse(rawText) {
    let clean = rawText.trim();
    if (clean.startsWith("```json")) {
      clean = clean.replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```\s*/i, "").replace(/\s*```$/i, "");
    }
    return clean.trim();
  },

  // Fetch actual supported models from the user's API Key
  async fetchAvailableModels(apiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!res.ok) return [];
      const data = await res.json();
      const models = (data.models || [])
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
        .map(m => m.name.replace(/^models\//, ""));
      this.discoveredModels = models;
      return models;
    } catch (e) {
      console.warn("Could not list models from Gemini API:", e);
      return [];
    }
  },

  // Generate full readiness plan via Google Gemini API
  async generateReadinessPlan(params, isFreeformPrompt = false, rawPromptText = "") {
    const apiKey = getActiveGeminiApiKey();

    if (!apiKey) {
      const err = new Error("API_KEY_REQUIRED");
      err.code = "API_KEY_REQUIRED";
      this.lastError = err;
      throw err;
    }

    let promptContent = "";

    if (isFreeformPrompt) {
      promptContent = `You are Travu, the world's most advanced AI Travel Readiness Copilot.
User Trip Context:
"${rawPromptText}"

Your task is to analyze their trip details (inferring origin, destination, cities, duration, traveler profile, purpose, and special constraints), and generate a comprehensive, actionable travel readiness blueprint.

CRITICAL POSITIONING:
"Itinerary tells you where to go. Travu tells you how to survive there."
Focus on:
1. Practical entry requirements, transit cards/passes, cashless/card payment nuances.
2. Essential apps to pre-install (including warnings about regional limitations like Google Maps walking restrictions in Korea, local taxi apps).
3. Cultural Etiquette Gaps comparing their origin country and destination.
4. Hidden frictions and practical things nobody tells tourists.
5. Adaptive packing list with "why".
6. First 2 hours arrival runway timeline from landing to hotel check-in.
7. Realistic culture shock scenario simulation.

You MUST reply ONLY with a valid JSON object matching this exact structure:
{
  "name": "Destination Country Name",
  "flag": "Flag Emoji",
  "originCountry": "Inferred Origin Country",
  "defaultCity": "Inferred City or Region",
  "currency": "Currency name and symbol",
  "language": "Official language(s)",
  "powerPlug": "Plug type (e.g. Type C & F 220V)",
  "emergencyNumbers": {
    "police": "Number",
    "ambulance": "Number",
    "touristHotline": "Tourist assistance or Consular contact"
  },
  "quickFacts": {
    "tapWater": "Tap water safety advice",
    "tipping": "Exact tipping etiquette",
    "weatherSummary": "Weather expectation",
    "simRule": "Connectivity and SIM card guidance"
  },
  "readinessItems": [
    {
      "id": "item-1",
      "category": "prepare|install|connectivity|payment|transport|pack|culture",
      "title": "Actionable Title",
      "priority": "must|rec|opt",
      "icon": "Emoji Icon",
      "summary": "Short 1-sentence summary",
      "why": "Deep 1-2 sentence explanation of why this matters for the traveler",
      "actionText": "CTA text",
      "actionUrl": "#",
      "tags": ["tourism", "study", "work", "nomad", "longstay"]
    }
  ],
  "cultureGaps": [
    {
      "topic": "Topic Name (e.g. Dining, Tipping, Restrooms, Transit Silence, Escalators)",
      "icon": "Emoji",
      "originDesc": "How this works in origin country",
      "destDesc": "How this works in destination country",
      "rule": "Golden rule for the traveler"
    }
  ],
  "hiddenFrictions": [
    {
      "category": "Category",
      "icon": "Emoji",
      "title": "Friction Title",
      "detail": "Practical insider hack or friction explanation",
      "severity": "critical|high|medium"
    }
  ],
  "appStack": [
    {
      "name": "App Name",
      "role": "Role (e.g. Essential Navigation)",
      "badge": "Must-Have|Essential|Useful|Emergency",
      "icon": "Emoji",
      "desc": "Why to install this app",
      "warning": "Important regional note or setup requirement"
    }
  ],
  "packingMatrix": {
    "must": [{"name": "Item Name", "desc": "Reason"}],
    "rec": [{"name": "Item Name", "desc": "Reason"}],
    "opt": [{"name": "Item Name", "desc": "Reason"}]
  },
  "scenarios": [
    {
      "id": "sim-1",
      "title": "Scenario Title",
      "situation": "Detailed real-world situation encountered at destination",
      "question": "What is the best way to handle this?",
      "options": [
        {"text": "Option A text", "correct": false, "feedback": "Why this is incorrect"},
        {"text": "Option B text", "correct": true, "feedback": "Why this is correct"},
        {"text": "Option C text", "correct": false, "feedback": "Why this is incorrect"}
      ],
      "culturalTip": "Extra cultural etiquette insider tip"
    }
  ],
  "arrivalSteps": [
    {
      "time": "Minutes 00 - 15",
      "title": "Step Title",
      "icon": "Emoji",
      "desc": "Step instructions"
    }
  ]
}`;
    } else {
      promptContent = `You are Travu, the world's most advanced AI Travel Readiness Copilot.
Generate a comprehensive, highly actionable travel readiness blueprint for:
- Origin Country: ${params.originCountry}
- Destination Country: ${params.destCountry}
- City / Region: ${params.city}
- Duration: ${params.duration}
- Travel Purpose: ${params.purpose}
- Traveler Profile: ${params.group}

CRITICAL POSITIONING:
"Itinerary tells you where to go. Travu tells you how to survive there."
Focus on practical local laws, transport cards/passes, essential apps (with regional limitation warnings like Google Maps walking restrictions in Korea), cultural etiquette differences from ${params.originCountry}, hidden frictions, packing with reasoning, and first 2 hours arrival timeline.

You MUST reply ONLY with a valid JSON object matching this exact structure:
{
  "name": "${params.destCountry}",
  "flag": "Flag Emoji",
  "originCountry": "${params.originCountry}",
  "defaultCity": "${params.city}",
  "currency": "Currency name and symbol",
  "language": "Official language(s)",
  "powerPlug": "Plug type (e.g. Type C & F 220V)",
  "emergencyNumbers": {
    "police": "Number",
    "ambulance": "Number",
    "touristHotline": "Tourist assistance or Consular contact"
  },
  "quickFacts": {
    "tapWater": "Tap water safety advice",
    "tipping": "Exact tipping etiquette",
    "weatherSummary": "Weather expectation",
    "simRule": "Connectivity and SIM card guidance"
  },
  "readinessItems": [
    {
      "id": "item-1",
      "category": "prepare|install|connectivity|payment|transport|pack|culture",
      "title": "Actionable Title",
      "priority": "must|rec|opt",
      "icon": "Emoji Icon",
      "summary": "Short 1-sentence summary",
      "why": "Deep 1-2 sentence explanation of why this matters for a traveler from ${params.originCountry}",
      "actionText": "CTA text",
      "actionUrl": "#",
      "tags": ["tourism", "study", "work", "nomad", "longstay"]
    }
  ],
  "cultureGaps": [
    {
      "topic": "Topic Name (e.g. Dining, Tipping, Restrooms, Transit Silence, Escalators)",
      "icon": "Emoji",
      "originDesc": "How this works in ${params.originCountry}",
      "destDesc": "How this works in ${params.destCountry}",
      "rule": "Golden rule for the traveler"
    }
  ],
  "hiddenFrictions": [
    {
      "category": "Category",
      "icon": "Emoji",
      "title": "Friction Title",
      "detail": "Practical insider hack or friction explanation",
      "severity": "critical|high|medium"
    }
  ],
  "appStack": [
    {
      "name": "App Name",
      "role": "Role (e.g. Essential Navigation)",
      "badge": "Must-Have|Essential|Useful|Emergency",
      "icon": "Emoji",
      "desc": "Why to install this app",
      "warning": "Important regional note or setup requirement"
    }
  ],
  "packingMatrix": {
    "must": [{"name": "Item Name", "desc": "Reason"}],
    "rec": [{"name": "Item Name", "desc": "Reason"}],
    "opt": [{"name": "Item Name", "desc": "Reason"}]
  },
  "scenarios": [
    {
      "id": "sim-1",
      "title": "Scenario Title",
      "situation": "Detailed real-world situation encountered in ${params.destCountry}",
      "question": "What is the best way to handle this?",
      "options": [
        {"text": "Option A text", "correct": false, "feedback": "Why this is incorrect"},
        {"text": "Option B text", "correct": true, "feedback": "Why this is correct"},
        {"text": "Option C text", "correct": false, "feedback": "Why this is incorrect"}
      ],
      "culturalTip": "Extra cultural etiquette insider tip"
    }
  ],
  "arrivalSteps": [
    {
      "time": "Minutes 00 - 15",
      "title": "Step Title",
      "icon": "Emoji",
      "desc": "Step instructions"
    }
  ]
}`;
    }

    this.lastPrompt = promptContent;

    // Determine models to try
    let modelsToTry = [];
    const customUserSetting = (localStorage.getItem("travu_gemini_model") || "").trim();
    if (customUserSetting) {
      modelsToTry.push(customUserSetting);
    }

    // Auto discover from API key if not yet cached
    if (!this.discoveredModels.length) {
      const discovered = await this.fetchAvailableModels(apiKey);
      if (discovered.length) {
        modelsToTry.push(...discovered);
      }
    } else {
      modelsToTry.push(...this.discoveredModels);
    }

    // Fallback standard list of all Gemini active versions
    const standardModels = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash-latest",
      "gemini-1.5-flash-002",
      "gemini-1.5-flash-001",
      "gemini-1.5-flash",
      "gemini-1.5-pro-latest",
      "gemini-1.5-pro",
      "gemini-pro"
    ];
    modelsToTry.push(...standardModels);

    // Remove duplicates
    modelsToTry = Array.from(new Set(modelsToTry));

    let lastErrorMsg = "";

    for (const modelName of modelsToTry) {
      const versions = ["v1beta", "v1"];
      for (const ver of versions) {
        try {
          const endpointUrl = `https://generativelanguage.googleapis.com/${ver}/models/${modelName}:generateContent?key=${apiKey}`;
          
          const payload = {
            contents: [{ role: "user", parts: [{ text: promptContent }] }],
            generationConfig: {
              temperature: 0.25,
              responseMimeType: "application/json"
            }
          };

          const response = await fetch(endpointUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            lastErrorMsg = errData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
            if (response.status === 404 || lastErrorMsg.includes("not found")) {
              continue; // Try next model / version
            }
            if (response.status === 400 && lastErrorMsg.includes("API_KEY_INVALID")) {
              throw new Error("Your Google Gemini API Key is invalid. Please check and re-enter a valid API key from https://aistudio.google.com/");
            }
            throw new Error(lastErrorMsg);
          }

          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!rawText) continue;

          this.lastRawResponse = rawText;
          const sanitized = this.sanitizeJsonResponse(rawText);
          const parsed = JSON.parse(sanitized);
          this.lastError = null;

          // Remember working model
          localStorage.setItem("travu_gemini_working_model", modelName);
          return parsed;

        } catch (e) {
          lastErrorMsg = e.message;
          if (e.message.includes("API Key is invalid") || e.message.includes("API_KEY_INVALID")) {
            throw e;
          }
        }
      }
    }

    throw new Error(lastErrorMsg || "Unable to reach a supported Gemini model. Please verify your API Key at https://aistudio.google.com/");
  },

  // Generate a custom Culture Shock Scenario dynamically
  async generateCustomScenario(userPromptText, currentContext) {
    const apiKey = getActiveGeminiApiKey();

    if (!apiKey) {
      const err = new Error("API_KEY_REQUIRED");
      err.code = "API_KEY_REQUIRED";
      throw err;
    }

    const prompt = `Create a realistic, multiple-choice Culture Shock Simulator scenario for a traveler from ${currentContext.origin} visiting ${currentContext.destination}.
User's situation prompt: "${userPromptText}".

Return ONLY a JSON object matching this exact structure:
{
  "id": "custom-sim-${Date.now()}",
  "title": "Short descriptive scenario title",
  "situation": "Detailed realistic narrative of the situation",
  "question": "Clear question asking what the traveler should do",
  "options": [
    { "text": "Option A", "correct": false, "feedback": "Detailed explanation of why this fails or causes social friction" },
    { "text": "Option B", "correct": true, "feedback": "Detailed explanation of why this is the polite/correct local custom" },
    { "text": "Option C", "correct": false, "feedback": "Detailed explanation of why this is incorrect" }
  ],
  "culturalTip": "A valuable cultural insider golden rule"
}`;

    const workingModel = localStorage.getItem("travu_gemini_working_model") || "gemini-1.5-flash-latest";
    const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${workingModel}:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, responseMimeType: "application/json" }
    };

    const res = await fetch(endpointUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || "Failed to generate scenario via Gemini API.");
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error("Empty response for custom scenario.");
    return JSON.parse(this.sanitizeJsonResponse(raw));
  }
};
