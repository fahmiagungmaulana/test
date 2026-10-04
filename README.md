# Travu — AI Travel Readiness Copilot

> **"Itinerary tells you where to go. Travu tells you how to survive there."**

Travu is an AI-powered travel readiness platform that transforms your destination, duration, origin background, and travel purpose into a personalized preparation and survival plan. It equips travelers with essential knowledge on what to pack, what local apps to install, cultural etiquette differences to navigate, payment methods, and a step-by-step runway timeline upon landing.

---

## 🌟 Key Features

1. **Dual Generation Modes**:
   - **Structured Fields**: Quick inputs for Origin, Destination, City/Region, Duration, Purpose, and Traveler Profile.
   - **Natural Language Prompt**: Freeform paragraph input parsed directly by Gemini AI.

2. **Personalized Readiness Blueprint & Live Score**:
   - Dynamic Radial Score Meter with real-time checkbox progression.
   - Categorized by priority: 🔴 *Must Prepare*, 🟡 *Recommended*, 🟢 *Optional*.
   - **Critical Pre-Departure Warnings**: Highlight essential local rules (e.g. Google Maps walking limitations, cashless café rules).

3. **Culture Gap Engine**:
   - Side-by-side behavioral contrast between the traveler's **Origin** and **Destination** (dining manners, transit quietness, restroom expectations, escalator etiquette, tipping rules).

4. **Things Nobody Tells You (Hidden Frictions)**:
   - Practical insider hacks and local nuances.

5. **Destination App Stack**:
   - Essential local apps with warnings regarding regional limitations and phone verification requirements.

6. **AI Packing Intelligence & *"Do I Need This?"* Evaluator**:
   - Real-time item analyzer to check customs regulations and local utility for any item.

7. **Culture Shock Simulator**:
   - Interactive scenario training with instant cultural explanations + **Custom AI Scenario Creator** via prompt.

8. **Live Arrival Mode (The First 2 Hours)**:
   - Step-by-step runway-to-accommodation timeline (connectivity, immigration, transit cards, emergency hotlines).

9. **Travu AI Copilot Chatbot**:
   - Context-aware interactive assistant with quick prompt chips.

---

## 🚀 Quick Start

### 1. Run Locally
Open `index.html` in any modern web browser or serve via any static HTTP server:

```bash
# Python 3
python -m http.server 3000

# or Node npx
npx serve .
```

Visit: `http://localhost:3000`

### 2. Connect Google Gemini AI
1. Click the **"Gemini API Key"** button in the top navigation bar.
2. Enter your free API key from [Google AI Studio](https://aistudio.google.com/).
3. Select your model (e.g. `Gemini 1.5 Flash`, `Gemini 2.5 Flash`, or enter custom model).
4. Click **Save Key & Connect**.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Modern Responsive CSS3 (High-contrast Dark/Light Design System).
- **AI Integration**: Google Gemini REST API (Structured JSON output & multi-model fallback).

---

## 📄 License
MIT License
