/* ==========================================================================
   TRAVU - APPLICATION CONTROLLER & GEMINI AI INTEGRATION
   Live AI Generation, Dual Generator Tabs (Fields vs Prompt), Dashboard Modes
   ========================================================================== */

const state = {
  currentOrigin: "Indonesia",
  currentDestName: "South Korea",
  currentCity: "Seoul + Busan",
  currentDuration: "6 - 14 Days",
  currentPurpose: "tourism",
  currentGroup: "solo",
  generatorInputMode: "fields", // "fields" or "prompt"
  activeDashboardMode: "prep", // "prep" or "arrival"
  activeTab: "tab-checklist",
  activePriorityFilter: "all",
  checkedItemIds: new Set(),
  activeData: null,
  currentScenarioIndex: 0
};

document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  updateEngineStatusBadge();
  setupEventListeners();
});

// Load Checkboxes, Theme, and Settings from Storage
function loadSavedState() {
  const savedTheme = localStorage.getItem("travu_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  const savedChecks = localStorage.getItem("travu_checked_items");
  if (savedChecks) {
    try {
      state.checkedItemIds = new Set(JSON.parse(savedChecks));
    } catch (e) {
      state.checkedItemIds = new Set();
    }
  }

  const savedKey = localStorage.getItem("travu_gemini_api_key") || "";
  const keyInput = document.getElementById("input-custom-gemini-key");
  if (keyInput) keyInput.value = savedKey;

  const savedModel = localStorage.getItem("travu_gemini_model") || "gemini-1.5-flash";
  const modelSelect = document.getElementById("select-gemini-model");
  if (modelSelect) modelSelect.value = savedModel;
}

function saveStateToStorage() {
  localStorage.setItem("travu_checked_items", JSON.stringify(Array.from(state.checkedItemIds)));
}

// Theme Toggle
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("travu_theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

// Header Status Badge
function updateEngineStatusBadge() {
  const label = document.getElementById("ai-engine-label");
  const key = getActiveGeminiApiKey();

  if (label) {
    if (key) {
      label.innerHTML = `<span style="color: #34d399;">●</span> Gemini API Connected`;
    } else {
      label.innerHTML = `<span style="color: #fbbf24;">●</span> Connect Gemini Key`;
    }
  }
}

// Switch Generator Method Tabs (Structured Fields vs Custom Prompt)
function switchGeneratorInputMode(mode) {
  state.generatorInputMode = mode;
  const btnFields = document.getElementById("tab-btn-fields");
  const btnPrompt = document.getElementById("tab-btn-prompt");
  const secFields = document.getElementById("gen-section-fields");
  const secPrompt = document.getElementById("gen-section-prompt");

  hideConfigError();

  if (mode === "prompt") {
    btnFields.classList.remove("active");
    btnPrompt.classList.add("active");
    secFields.style.display = "none";
    secPrompt.style.display = "block";
  } else {
    btnPrompt.classList.remove("active");
    btnFields.classList.add("active");
    secPrompt.style.display = "none";
    secFields.style.display = "block";
  }
}

// Preset Quick Selection
function applyPresetValues(origin, dest, city, duration, purpose, group) {
  switchGeneratorInputMode("fields");
  document.getElementById("cfg-origin").value = origin;
  document.getElementById("cfg-destination").value = dest;
  document.getElementById("cfg-city").value = city;
  document.getElementById("cfg-duration").value = duration;
  document.getElementById("cfg-purpose").value = purpose;
  document.getElementById("cfg-group").value = group;

  document.querySelectorAll(".config-preset-pills .preset-pill").forEach(p => p.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  hideConfigError();
  startPlanGeneration();
}

// Main Plan Generation Trigger with Gemini AI
async function startPlanGeneration() {
  const apiKey = getActiveGeminiApiKey();

  // 1. Enforce API Key Check
  if (!apiKey) {
    showConfigError("Google Gemini API Key is required to generate real AI travel readiness plans. Please click 'Connect Gemini Key' or enter your key.");
    openApiKeyModal();
    return;
  }

  let aiParams = {};
  let isPrompt = false;
  let rawPromptText = "";

  if (state.generatorInputMode === "prompt") {
    const promptInput = document.getElementById("cfg-freeform-prompt");
    rawPromptText = promptInput ? promptInput.value.trim() : "";
    if (!rawPromptText) {
      showConfigError("Please enter your travel description in the prompt box before generating.");
      return;
    }
    isPrompt = true;
  } else {
    // Fields Mode Validation
    const origin = document.getElementById("cfg-origin").value.trim();
    const dest = document.getElementById("cfg-destination").value.trim();
    const city = document.getElementById("cfg-city").value.trim();
    const duration = document.getElementById("cfg-duration").value;
    const purpose = document.getElementById("cfg-purpose").value;
    const group = document.getElementById("cfg-group").value;

    if (!origin || !dest || !city) {
      showConfigError("Please fill out all required fields marked with * (Origin, Destination, and City/Region).");
      return;
    }

    if (origin.toLowerCase() === dest.toLowerCase()) {
      showConfigError(`Origin and Destination cannot be the same country ("${dest}"). Travu is designed for international cross-border travel readiness.`);
      return;
    }

    aiParams = {
      originCountry: origin,
      destCountry: dest,
      city: city,
      duration: duration,
      purpose: purpose,
      group: group
    };

    state.currentOrigin = origin;
    state.currentDestName = dest;
    state.currentCity = city;
    state.currentDuration = duration;
    state.currentPurpose = purpose;
    state.currentGroup = group;
  }

  hideConfigError();

  // Show Loading Animation
  const loader = document.getElementById("ai-loader");
  const dashboard = document.getElementById("dashboard-section");
  const loaderTitle = document.getElementById("ai-loader-title");
  const loaderText = document.getElementById("ai-loader-text");

  if (dashboard) dashboard.classList.remove("visible");
  if (loader) loader.classList.add("visible");
  loader.scrollIntoView({ behavior: "smooth", block: "center" });

  if (loaderTitle) loaderTitle.innerText = "Querying Google Gemini AI Model...";
  if (loaderText) {
    loaderText.innerText = isPrompt 
      ? `Analyzing your custom prompt with Gemini AI...`
      : `Synthesizing live cross-border blueprint for ${state.currentOrigin} ➔ ${state.currentDestName}...`;
  }

  try {
    const generatedData = await GeminiAI.generateReadinessPlan(aiParams, isPrompt, rawPromptText);

    if (isPrompt && generatedData) {
      state.currentOrigin = generatedData.originCountry || "Your Origin";
      state.currentDestName = generatedData.name || "Destination";
      state.currentCity = generatedData.defaultCity || "Destination Region";
    }

    state.activeData = generatedData;

    if (loader) loader.classList.remove("visible");
    if (dashboard) dashboard.classList.add("visible");

    renderAllModules();
    updateReadinessScore();
    updateEngineStatusBadge();

    // Default to Preparation Mode View
    switchDashboardMode("prep");

    dashboard.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (err) {
    console.error("Gemini AI generation failed:", err);
    if (loader) loader.classList.remove("visible");

    if (err.message === "API_KEY_REQUIRED") {
      showConfigError("Google Gemini API Key is required. Please enter your key in the settings modal.");
      openApiKeyModal();
    } else {
      showConfigError(`Gemini API Error: ${err.message}. Please verify your API Key or quota in settings.`);
    }
  }
}

function showConfigError(msg) {
  const banner = document.getElementById("config-error-banner");
  const text = document.getElementById("config-error-text");
  if (banner && text) {
    text.innerText = msg;
    banner.style.display = "flex";
    banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function hideConfigError() {
  const banner = document.getElementById("config-error-banner");
  if (banner) banner.style.display = "none";
}

// Dashboard Mode Switcher (Located inside Dashboard: Preparation Mode vs Live Arrival Mode)
function switchDashboardMode(mode) {
  state.activeDashboardMode = mode;
  const btnPrep = document.getElementById("btn-dash-prep-mode");
  const btnArr = document.getElementById("btn-dash-arrival-mode");
  const viewPrep = document.getElementById("view-preparation-mode");
  const viewArr = document.getElementById("view-arrival-mode");

  if (mode === "arrival") {
    btnPrep.classList.remove("active");
    btnArr.classList.add("active");
    if (viewPrep) viewPrep.style.display = "none";
    if (viewArr) viewArr.style.display = "block";
  } else {
    btnArr.classList.remove("active");
    btnPrep.classList.add("active");
    if (viewArr) viewArr.style.display = "none";
    if (viewPrep) viewPrep.style.display = "block";
    switchTab("tab-checklist");
  }
}

// Preparation Mode Tab Switcher
function switchTab(tabId) {
  state.activeTab = tabId;
  const tabs = document.querySelectorAll(".tab-navigation-bar .tab-btn");
  const panels = document.querySelectorAll("#view-preparation-mode .tab-panel");

  tabs.forEach(tab => {
    const isTarget = tab.getAttribute("onclick") && tab.getAttribute("onclick").includes(tabId);
    if (isTarget) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  panels.forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });
}

// Render All Modules
function renderAllModules() {
  const dest = state.activeData || {};

  document.getElementById("active-route-badge").innerText = `${state.currentOrigin} ➔ ${dest.flag || '🌍'} ${dest.name || state.currentDestName}`;
  document.getElementById("active-purpose-badge").innerText = `${getPurposeLabel(state.currentPurpose)} • ${state.currentDuration}`;
  document.getElementById("plan-headline").innerText = `Personalized Travel Readiness Plan: ${dest.name || state.currentDestName}`;
  document.getElementById("eval-country-name").innerText = dest.name || state.currentDestName;

  const cultOrigin = document.getElementById("culture-origin-title");
  const cultDest = document.getElementById("culture-dest-title");
  if (cultOrigin) cultOrigin.innerText = state.currentOrigin;
  if (cultDest) cultDest.innerText = `${dest.flag || ''} ${dest.name || state.currentDestName}`;

  renderCriticalAlerts(dest);
  renderReadinessChecklist(dest);
  renderCultureGaps(dest);
  renderHiddenFrictions(dest);
  renderAppStack(dest);
  renderPackingMatrix(dest);
  renderScenarioPills(dest);
  renderScenario(0);
  renderArrivalTimeline(dest);
  renderEmergencyContacts(dest);
}

function getPurposeLabel(p) {
  const map = { tourism: "Tourism", study: "Study Abroad", work: "Business", nomad: "Digital Nomad", longstay: "Long Stay" };
  return map[p] || "Trip";
}

// 1. Critical Alerts Render
function renderCriticalAlerts(dest) {
  const container = document.getElementById("critical-alerts-list");
  if (!container) return;

  const alerts = dest.hiddenFrictions ? dest.hiddenFrictions.slice(0, 3) : [];
  container.innerHTML = alerts.map(a => `
    <div class="alert-item-box">
      <span class="icon">${a.icon || '⚠️'}</span>
      <div>
        <strong style="color: var(--text-primary); display: block; margin-bottom: 2px;">${a.title}</strong>
        <span style="color: var(--text-secondary); font-size: 0.85rem;">${a.detail}</span>
      </div>
    </div>
  `).join("");
}

// 2. Readiness Checklist Render
function renderReadinessChecklist(dest) {
  const container = document.getElementById("readiness-cards-container");
  if (!container) return;

  let items = dest.readinessItems || [];

  if (state.activePriorityFilter !== "all") {
    items = items.filter(item => item.priority === state.activePriorityFilter);
  }

  const tabCount = document.getElementById("badge-tab-count");
  if (tabCount) tabCount.innerText = items.length;

  container.innerHTML = items.map((item, idx) => {
    const itemId = item.id || `item-${idx}`;
    const isChecked = state.checkedItemIds.has(itemId);
    const badgeClass = item.priority === "must" ? "badge-must" : (item.priority === "rec" ? "badge-rec" : "badge-opt");
    const priorityLabel = item.priority === "must" ? "🔴 Must Prepare" : (item.priority === "rec" ? "🟡 Recommended" : "🟢 Optional");

    return `
      <div class="readiness-item-card ${isChecked ? 'completed' : ''}" id="card-${itemId}">
        <div>
          <div class="item-top-row">
            <div class="item-header-left">
              <div class="item-icon-box">${item.icon || '📋'}</div>
              <div class="item-title-wrap">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span class="badge ${badgeClass}">${priorityLabel}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">${item.category || 'General'}</span>
                </div>
                <h3>${item.title}</h3>
              </div>
            </div>
            <input type="checkbox" class="item-checkbox" ${isChecked ? 'checked' : ''} onchange="toggleItemCheck('${itemId}')" title="Mark as ready">
          </div>

          <p style="color: var(--text-primary); font-size: 0.92rem; margin-bottom: 0.5rem;">
            ${item.summary}
          </p>

          <div class="item-why-box">
            <strong><i class="fa-solid fa-circle-question"></i> Why this matters for ${state.currentOrigin} travelers:</strong>
            ${item.why}
          </div>
        </div>

        <div class="item-footer-action">
          <span><i class="fa-solid fa-shield-halved"></i> Verified AI Synthesis</span>
          <a href="${item.actionUrl || '#'}" target="_blank" class="item-action-link">
            <span>${item.actionText || 'Action Details'}</span>
            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i>
          </a>
        </div>
      </div>
    `;
  }).join("");

  updatePriorityFilterCounts(dest);
}

function updatePriorityFilterCounts(dest) {
  const items = dest.readinessItems || [];

  const mustCount = items.filter(i => i.priority === "must").length;
  const recCount = items.filter(i => i.priority === "rec").length;
  const optCount = items.filter(i => i.priority === "opt").length;

  if (document.getElementById("count-filter-all")) document.getElementById("count-filter-all").innerText = items.length;
  if (document.getElementById("count-filter-must")) document.getElementById("count-filter-must").innerText = mustCount;
  if (document.getElementById("count-filter-rec")) document.getElementById("count-filter-rec").innerText = recCount;
  if (document.getElementById("count-filter-opt")) document.getElementById("count-filter-opt").innerText = optCount;

  if (document.getElementById("stat-must-count")) document.getElementById("stat-must-count").innerText = `${mustCount} Items`;
  if (document.getElementById("stat-rec-count")) document.getElementById("stat-rec-count").innerText = `${recCount} Items`;
  if (document.getElementById("stat-opt-count")) document.getElementById("stat-opt-count").innerText = `${optCount} Items`;
}

function filterReadinessPriority(priority, btnEl) {
  state.activePriorityFilter = priority;
  document.querySelectorAll("#tab-checklist .preset-pill").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const dest = state.activeData || {};
  renderReadinessChecklist(dest);
}

function toggleItemCheck(id) {
  if (state.checkedItemIds.has(id)) {
    state.checkedItemIds.delete(id);
  } else {
    state.checkedItemIds.add(id);
  }
  saveStateToStorage();

  const card = document.getElementById(`card-${id}`);
  if (card) {
    if (state.checkedItemIds.has(id)) {
      card.classList.add("completed");
    } else {
      card.classList.remove("completed");
    }
  }

  updateReadinessScore();
}

function updateReadinessScore() {
  const dest = state.activeData || {};
  const items = dest.readinessItems || [];

  const total = items.length;
  let done = 0;

  items.forEach((item, idx) => {
    const itemId = item.id || `item-${idx}`;
    if (state.checkedItemIds.has(itemId)) done++;
  });

  let score = 60;
  if (total > 0) {
    score = Math.round(60 + (done / total) * 40);
  }
  if (done === total && total > 0) score = 100;

  const scoreText = document.getElementById("score-val-text");
  if (scoreText) scoreText.innerText = `${score}%`;

  const doneCount = document.getElementById("stat-done-count");
  if (doneCount) doneCount.innerText = `${done} / ${total}`;

  const circle = document.getElementById("score-circle-bar");
  if (circle) {
    const circumference = 377;
    const offset = circumference - (score / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
}

// 3. Culture Gap Engine Render
function renderCultureGaps(dest) {
  const container = document.getElementById("culture-gaps-container");
  if (!container) return;

  const gaps = dest.cultureGaps || [];
  container.innerHTML = gaps.map(g => `
    <div class="culture-gap-card">
      <div class="culture-gap-header">
        <div class="culture-gap-title-group">
          <div class="culture-icon-badge">${g.icon || '🧠'}</div>
          <h3 class="culture-gap-title">${g.topic}</h3>
        </div>
        <span class="badge badge-info">Cultural Contrast</span>
      </div>

      <div class="gap-comparison-row">
        <div class="gap-box origin">
          <div class="gap-box-label"><i class="fa-solid fa-flag"></i> In ${state.currentOrigin} (Origin)</div>
          <p>${g.originDesc}</p>
        </div>
        <div class="gap-box dest">
          <div class="gap-box-label"><i class="fa-solid fa-location-dot"></i> In ${dest.name || state.currentDestName} (Destination)</div>
          <p>${g.destDesc}</p>
        </div>
      </div>

      <div class="gap-action-tip">
        <i class="fa-solid fa-lightbulb"></i>
        <div><strong>Golden Rule for You:</strong> ${g.rule}</div>
      </div>
    </div>
  `).join("");
}

// 4. Hidden Frictions Render
function renderHiddenFrictions(dest) {
  const container = document.getElementById("hidden-frictions-container");
  if (!container) return;

  const frictions = dest.hiddenFrictions || [];
  container.innerHTML = frictions.map(f => `
    <div class="friction-card">
      <div class="friction-card-top">
        <div class="friction-header-row">
          <span class="badge ${f.severity === 'critical' ? 'badge-must' : 'badge-rec'}">${f.category || 'Local Practice'}</span>
          <div class="friction-icon-circle">${f.icon || '💡'}</div>
        </div>
        <h3 class="friction-title">${f.title}</h3>
        <p class="friction-desc">${f.detail}</p>
      </div>
      <div class="friction-meta-footer">
        <i class="fa-solid fa-circle-check"></i> Verified Local Reality
      </div>
    </div>
  `).join("");
}

// 5. App Stack Render
function renderAppStack(dest) {
  const container = document.getElementById("app-stack-container");
  if (!container) return;

  const apps = dest.appStack || [];
  container.innerHTML = apps.map(app => `
    <div class="app-card">
      <div class="app-card-content">
        <div class="app-header">
          <div class="app-brand">
            <div class="app-icon-wrap">${app.icon || '📱'}</div>
            <div class="app-title-group">
              <h3 class="app-name">${app.name}</h3>
              <span class="app-category">${app.role}</span>
            </div>
          </div>
          <span class="badge badge-info">${app.badge || 'Essential'}</span>
        </div>

        <p class="app-desc">
          ${app.desc}
        </p>

        ${app.warning ? `
          <div class="app-warning-box">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span><strong>Note:</strong> ${app.warning}</span>
          </div>
        ` : ''}
      </div>

      <button class="btn-secondary app-install-btn" onclick="alert('Pre-install ${app.name} prior to departure.')">
        <i class="fa-solid fa-download"></i> Pre-install App
      </button>
    </div>
  `).join("");
}

// 6. Packing Matrix Render
function renderPackingMatrix(dest) {
  const container = document.getElementById("packing-matrix-container");
  if (!container) return;

  const matrix = dest.packingMatrix || { must: [], rec: [], opt: [] };

  container.innerHTML = `
    <div class="packing-column-card">
      <div class="packing-header must">
        <div class="packing-header-title">
          <i class="fa-solid fa-circle-exclamation"></i>
          <h4>Must Bring (Essential)</h4>
        </div>
        <span class="badge badge-must">Priority 1</span>
      </div>
      <ul class="packing-items-list">
        ${(matrix.must || []).map(m => `
          <li class="packing-item">
            <div class="packing-item-bullet must"></div>
            <div class="packing-item-text">
              <strong>${m.name}</strong>
              <p>${m.desc}</p>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>

    <div class="packing-column-card">
      <div class="packing-header rec">
        <div class="packing-header-title">
          <i class="fa-solid fa-cart-shopping"></i>
          <h4>Recommended to Bring</h4>
        </div>
        <span class="badge badge-rec">Priority 2</span>
      </div>
      <ul class="packing-items-list">
        ${(matrix.rec || []).map(m => `
          <li class="packing-item">
            <div class="packing-item-bullet rec"></div>
            <div class="packing-item-text">
              <strong>${m.name}</strong>
              <p>${m.desc}</p>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>

    <div class="packing-column-card">
      <div class="packing-header opt">
        <div class="packing-header-title">
          <i class="fa-solid fa-thumbs-up"></i>
          <h4>Optional / Personal</h4>
        </div>
        <span class="badge badge-opt">Priority 3</span>
      </div>
      <ul class="packing-items-list">
        ${(matrix.opt || []).map(m => `
          <li class="packing-item">
            <div class="packing-item-bullet opt"></div>
            <div class="packing-item-text">
              <strong>${m.name}</strong>
              <p>${m.desc}</p>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

// "Do I Need This?" Evaluator
function evaluateUserItem() {
  const inputEl = document.getElementById("item-eval-input");
  const query = inputEl ? inputEl.value.trim().toLowerCase() : "";
  if (!query) return;

  const destName = state.currentDestName;
  const resultCard = document.getElementById("evaluator-result-card");
  const titleEl = document.getElementById("eval-result-title");
  const verdictEl = document.getElementById("eval-result-verdict");
  const expEl = document.getElementById("eval-result-explanation");

  resultCard.style.display = "block";
  titleEl.innerText = `AI Evaluation: "${inputEl.value.trim()}"`;

  if (query.includes("bidet") || query.includes("sprayer") || query.includes("washlet")) {
    verdictEl.innerText = "🟡 HIGHLY RECOMMENDED";
    expEl.innerText = `Most public restrooms in ${destName} are dry and provide only dry toilet paper. If you prefer water personal hygiene, packing a travel bidet is a lifesaver.`;
  } else if (query.includes("plug") || query.includes("adapter") || query.includes("socket")) {
    verdictEl.innerText = "🔴 MUST BRING";
    expEl.innerText = `Wall outlets in ${destName} may not fit your home chargers. Pack a universal adapter with surge protection.`;
  } else if (query.includes("power bank") || query.includes("battery") || query.includes("charger")) {
    verdictEl.innerText = "🔴 MUST BRING (CABIN BAGGAGE ONLY)";
    expEl.innerText = `Heavy navigation and translation use will drain your smartphone. Keep power banks under 20,000 mAh and always carry them in your cabin baggage (strictly prohibited in checked luggage).`;
  } else if (query.includes("cash") || query.includes("money") || query.includes("currency")) {
    verdictEl.innerText = "🟡 BRING MODEST AMOUNT";
    expEl.innerText = `Prepare a small cash reserve for small street vendors, transit card recharges, or lockers, but rely on zero-FX debit/credit cards for larger purchases.`;
  } else if (query.includes("medicine") || query.includes("cold") || query.includes("paracetamol")) {
    verdictEl.innerText = "🟡 HIGHLY RECOMMENDED";
    expEl.innerText = `Pharmacies in ${destName} may require physician prescriptions for common antibiotics or strong pain relievers. Pack your essential personal first-aid items in original packaging.`;
  } else {
    verdictEl.innerText = "🟢 OPTIONAL / PACK IF NEEDED";
    expEl.innerText = `'${inputEl.value.trim()}' has no critical restrictions in ${destName}. Adhere to standard 100ml cabin liquid limits and avoid bringing fresh non-certified meat or plant products through customs.`;
  }
}

function quickEvaluateItem(itemName) {
  const inputEl = document.getElementById("item-eval-input");
  if (inputEl) {
    inputEl.value = itemName;
    evaluateUserItem();
  }
}

function insertPromptTemplate(templateType) {
  switchGeneratorInputMode("prompt");
  const promptInput = document.getElementById("cfg-freeform-prompt");
  if (!promptInput) return;

  const templates = {
    "korea-student": "I am an Indonesian student traveling to South Korea for 6 months on a university exchange program at Yonsei University in Seoul. I need to know essential local banking apps, alien registration card (ARC) rules, trash sorting regulations, cold winter clothing survival tips, and halal food navigation.",
    "japan-photography": "I am a solo photographer from the US doing a 14-day autumn tour across Tokyo, Kyoto, and rural Takayama. I want to know subway etiquette with camera gear, coin locker systems, power adapter standards, cash vs IC card requirements, and photography etiquette in temples.",
    "singapore-family": "We are a family of 4 from Indonesia (parents and 2 kids under 6) traveling to Singapore for a 4-day weekend trip. We need stroller accessibility tips on the MRT, local taxi vs Grab car seat rules, tap water safety, chewing gum customs, and family friendly payment methods.",
    "swiss-winter": "I am an independent traveler from Australia visiting Switzerland for 10 days in January. Visiting Zurich, Interlaken, and Zermatt. I need to know Swiss Travel Pass validity, mountain train reservations, winter gear packing necessities, tipping etiquette in chalets, and supermarket discount hours."
  };

  promptInput.value = templates[templateType] || "";
  promptInput.focus();
}

// 7. Culture Simulator & Custom Prompt Generator
function renderScenarioPills(dest) {
  const container = document.getElementById("sim-scenario-pills");
  if (!container) return;

  const scenarios = dest.scenarios || [];
  container.innerHTML = scenarios.map((sc, idx) => `
    <button class="preset-pill ${idx === state.currentScenarioIndex ? 'active' : ''}" onclick="loadScenario(${idx}, this)">
      ${sc.title ? sc.title.slice(0, 20) : `Scenario ${idx + 1}`}
    </button>
  `).join("");
}

function loadScenario(index, btnEl) {
  state.currentScenarioIndex = index;
  document.querySelectorAll("#sim-scenario-pills .preset-pill").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderScenario(index);
}

function renderScenario(index) {
  const dest = state.activeData || {};
  const scenarios = dest.scenarios || [];
  const sc = scenarios[index] || scenarios[0];
  if (!sc) return;

  document.getElementById("sim-scenario-title").innerText = `Scenario: ${sc.title}`;
  document.getElementById("sim-scenario-text").innerText = sc.situation;
  document.getElementById("sim-question-text").innerText = sc.question;

  const optContainer = document.getElementById("sim-options-container");
  const expBox = document.getElementById("sim-explanation-box");
  expBox.style.display = "none";

  optContainer.innerHTML = (sc.options || []).map((opt, i) => `
    <button class="sim-option-btn" onclick="selectScenarioOption(${i}, ${opt.correct}, '${encodeURIComponent(opt.feedback || '')}', '${encodeURIComponent(sc.culturalTip || '')}')">
      <span>${opt.text}</span>
      <i class="fa-regular fa-circle" id="opt-icon-${i}"></i>
    </button>
  `).join("");
}

function selectScenarioOption(index, isCorrect, encodedFeedback, encodedTip) {
  const feedback = decodeURIComponent(encodedFeedback);
  const tip = decodeURIComponent(encodedTip);

  const buttons = document.querySelectorAll(".sim-option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === index) {
      if (isCorrect) {
        btn.classList.add("correct");
        btn.querySelector("i").className = "fa-solid fa-circle-check";
      } else {
        btn.classList.add("wrong");
        btn.querySelector("i").className = "fa-solid fa-circle-xmark";
      }
    }
  });

  const expBox = document.getElementById("sim-explanation-box");
  const feedbackMsg = document.getElementById("sim-feedback-message");
  const tipMsg = document.getElementById("sim-tip-message");

  expBox.style.display = "block";
  feedbackMsg.innerHTML = `<strong style="color: ${isCorrect ? 'var(--status-opt)' : 'var(--status-must)'}; font-size: 1rem;">${isCorrect ? '🎉 Correct Choice!' : '⚠️ Not Recommended!'}</strong><p style="margin-top: 4px; color: var(--text-primary); font-size: 0.92rem;">${feedback}</p>`;

  if (tip) {
    tipMsg.innerHTML = `<strong><i class="fa-solid fa-book-open"></i> Cultural Insight:</strong> ${tip}`;
    tipMsg.style.display = "block";
  } else {
    tipMsg.style.display = "none";
  }
}

// Custom Scenario Generator via Prompt
async function createCustomAiScenario() {
  const promptInput = document.getElementById("custom-scenario-prompt");
  const promptText = promptInput ? promptInput.value.trim() : "";
  if (!promptText) return;

  const btn = document.getElementById("btn-create-scenario");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating with Gemini...`;
  }

  const context = {
    origin: state.currentOrigin,
    destination: state.currentDestName
  };

  try {
    const newScenario = await GeminiAI.generateCustomScenario(promptText, context);

    if (state.activeData) {
      if (!state.activeData.scenarios) state.activeData.scenarios = [];
      state.activeData.scenarios.unshift(newScenario);
      state.currentScenarioIndex = 0;
      renderScenarioPills(state.activeData);
      renderScenario(0);
    }
  } catch (err) {
    alert(`Failed to generate scenario: ${err.message}. Please check your Gemini API key.`);
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-sparkles"></i> Generate Scenario`;
  }
  promptInput.value = "";
}

// 8. Arrival Timeline Render
function renderArrivalTimeline(dest) {
  const container = document.getElementById("arrival-timeline-container");
  if (!container) return;

  const steps = dest.arrivalSteps || [];
  container.innerHTML = steps.map(s => `
    <div class="arrival-step-node">
      <div class="step-time-badge">${s.time || 'Airport Arrival'}</div>
      <h3 style="font-size: 1.1rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
        <span>${s.icon || '✈️'}</span> ${s.title}
      </h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${s.desc}</p>
    </div>
  `).join("");
}

function renderEmergencyContacts(dest) {
  const container = document.getElementById("emergency-contacts-grid");
  if (!container) return;

  const num = dest.emergencyNumbers || {};
  container.innerHTML = `
    <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">LOCAL POLICE</span>
      <strong style="font-size: 1.2rem; color: var(--text-primary);">${num.police || '112 / 911'}</strong>
    </div>
    <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">AMBULANCE & FIRE</span>
      <strong style="font-size: 1.2rem; color: var(--text-primary);">${num.ambulance || '112 / 911'}</strong>
    </div>
    <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">CONSULAR / TOURIST HOTLINE</span>
      <strong style="font-size: 0.95rem; color: var(--accent-cyan);">${num.touristHotline || 'Emergency Tourist Desk'}</strong>
    </div>
  `;
}

// 9. Download Readiness Pack
function downloadReadinessPack() {
  window.print();
}

// 10. AI Settings Modal
function openApiKeyModal() {
  const m = document.getElementById("api-key-modal");
  const feedback = document.getElementById("api-status-feedback");
  const key = getActiveGeminiApiKey();

  if (feedback) {
    if (key) {
      feedback.innerHTML = `<span style="color: var(--status-opt);"><i class="fa-solid fa-circle-check"></i> Gemini API Key is saved and active.</span>`;
    } else {
      feedback.innerHTML = `<span style="color: var(--status-rec);"><i class="fa-solid fa-triangle-exclamation"></i> API key is not set. Please enter a key to generate with Google Gemini AI.</span>`;
    }
  }

  if (m) m.classList.add("open");
}

function handleModelSelectChange(val) {
  const customInput = document.getElementById("input-custom-model-name");
  if (customInput) {
    customInput.style.display = val === "custom" ? "block" : "none";
    if (val === "custom") customInput.focus();
  }
}

function saveApiKeySettings() {
  const keyInput = document.getElementById("input-custom-gemini-key");
  const modelSelect = document.getElementById("select-gemini-model");
  const customModelInput = document.getElementById("input-custom-model-name");

  if (keyInput) {
    setActiveGeminiApiKey(keyInput.value.trim());
  }
  if (modelSelect) {
    const selectedModel = modelSelect.value === "custom" 
      ? (customModelInput ? customModelInput.value.trim() : "gemini-1.5-flash-latest")
      : modelSelect.value;
    localStorage.setItem("travu_gemini_model", selectedModel || "gemini-1.5-flash-latest");
  }

  updateEngineStatusBadge();
  closeModal("api-key-modal");
  hideConfigError();
  alert("Gemini API Key and Model settings successfully saved!");
}

function clearApiKeySettings() {
  setActiveGeminiApiKey("");
  const keyInput = document.getElementById("input-custom-gemini-key");
  if (keyInput) keyInput.value = "";
  updateEngineStatusBadge();
  closeModal("api-key-modal");
}

function toggleApiKeyVisibility() {
  const keyInput = document.getElementById("input-custom-gemini-key");
  if (keyInput) {
    keyInput.type = keyInput.type === "password" ? "text" : "password";
  }
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("open");
}

// 11. AI Copilot Chat System
function toggleCopilotChat() {
  const modal = document.getElementById("copilot-modal");
  if (modal.classList.contains("open")) {
    modal.classList.remove("open");
  } else {
    modal.classList.add("open");
    const input = document.getElementById("chat-user-input");
    if (input) input.focus();
  }
}

function openCopilotChat(initialPrompt) {
  const modal = document.getElementById("copilot-modal");
  modal.classList.add("open");
  if (initialPrompt) {
    sendQuickPrompt(initialPrompt);
  }
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById("chat-user-input");
  if (input) input.value = promptText;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById("chat-user-input");
  const msgContainer = document.getElementById("chat-messages-body");
  const query = input.value.trim();
  if (!query) return;

  const userMsgEl = document.createElement("div");
  userMsgEl.className = "chat-msg user";
  userMsgEl.innerText = query;
  msgContainer.appendChild(userMsgEl);

  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;

  const botMsgEl = document.createElement("div");
  botMsgEl.className = "chat-msg bot";
  botMsgEl.innerHTML = `<em><i class="fa-solid fa-spinner fa-spin"></i> Analyzing guidelines...</em>`;
  msgContainer.appendChild(botMsgEl);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  setTimeout(() => {
    const reply = generateCopilotResponse(query);
    botMsgEl.innerHTML = reply;
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 500);
}

function generateCopilotResponse(q) {
  const qLower = q.toLowerCase();
  const dest = state.activeData || {};
  const destName = state.currentDestName;

  if (qLower.includes("water") || qLower.includes("tap") || qLower.includes("drink")) {
    return `🚰 <strong>Tap Water Safety in ${destName}:</strong><br>${dest.quickFacts?.tapWater || 'Verify with your accommodation if tap water is safe or filtered water is preferred.'}`;
  }
  if (qLower.includes("tip") || qLower.includes("tipping") || qLower.includes("bill")) {
    return `💵 <strong>Tipping Custom in ${destName}:</strong><br>${dest.quickFacts?.tipping || 'Check if service charge is already included in restaurant receipts.'}`;
  }
  if (qLower.includes("card") || qLower.includes("transit") || qLower.includes("bus") || qLower.includes("subway") || qLower.includes("debit")) {
    return `🚇 <strong>Transit & Payment in ${destName}:</strong><br>Verify whether local subway and bus turnstiles accept contactless bank cards or require dedicated local transit cards (e.g. T-Money, Suica).`;
  }
  if (qLower.includes("plug") || qLower.includes("adapter") || qLower.includes("voltage")) {
    return `🔌 <strong>Power Plug Standards:</strong><br>${destName} operates on: <strong>${dest.powerPlug || 'Standard wall sockets'}</strong>. Ensure your chargers match this standard.`;
  }

  return `🤖 Based on Travu's intelligence for <strong>${destName}</strong> from <strong>${state.currentOrigin}</strong>: Ensure all entry clearance forms, transit cards, and cultural etiquette notes are reviewed before your departure. Feel free to ask about local apps, packing, or emergency contacts!`;
}

function setupEventListeners() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("api-key-modal");
      const copilot = document.getElementById("copilot-modal");
      if (copilot) copilot.classList.remove("open");
    }
  });

  const brandBtn = document.getElementById("brand-home-btn");
  if (brandBtn) {
    brandBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
