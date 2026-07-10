# ImagineFlow AI

ImagineFlow AI is a production-quality, collaborative prompt engineering workspace designed to optimize text-to-image prompts. Instead of a black-box prompt converter, the application serves as an interactive assistant that analyzes semantic gaps, offers structural fixes, explains prompt additions, and generates stunning images.

Optimized for **FLUX, Midjourney, DALL-E, and Gemini**, it demonstrates AI product thinking, modular architecture, and premium frontend execution.

---

## 🚀 Live Demo & Screenshots

**Live project:** [prompt-image-ten.vercel.app](https://prompt-image-ten.vercel.app)

ImagineFlow AI is fully responsive and features class-based Dark/Light themes, glassmorphism elements, Outfit/Inter typography, and staggered spring animations.

---

## ⚡ Features

### 1. Collaborative Prompt Co-creation
- **AI Strength Checker**: Prompt strength rating (`Excellent`, `Good`, `Needs More Details`, `Needs Improvement`) accompanied by inline explanations of missing tokens.

### 2. Prompt Comparison Dashboard
- Displays three cards comparing the **Original Prompt** input, the **Enhanced Prompt** (streaming in via typewriter), and a sequential list of **Changes Made** (e.g., *✓ Added composition*, *✓ Adjusted model tags*).

### 3. Structured Prompt Editor
- Decomposes the final prompt into 8 fields: **Subject, Style, Lighting, Composition, Camera, Background, Mood, and Rendering**.
- Users can edit each category individually or modify the complete merged string directly.
- **Platform Customization**: Standardized copy actions that format outputs for Gemini, Midjourney (`--ar` flags, `/imagine`), and DALL-E 3 (narrative sentences).
- **Rewrite Presets**: Real-time style translation pills (Photorealistic, Anime, Minimal, Cyberpunk, 3D Render, etc.).

### 4. Visual Output Canvas
- Generates high-quality images using the free, keyless Pollinations AI engine.
- Supports lightbox expansions, direct image downloading via blob fetching, and instant image regeneration.

### 5. Preset Library & Rotating Inspirations
- **18 Professional Templates**: Grid categories (Luxury Product Shot, Corporate Portrait, YouTube Thumbnail, etc.) that pre-populate parameters, aspect ratios, and sliders.
- **Daily Inspiration Challenge**: A rotating daily challenge with a "Use This Prompt" helper.

### 6. Local Storage History
- Automatically commits generations (prompts, seeds, dimensions, parameters, dates) to browser local storage.
- Instantly searchable history cards supporting **Generate Again** (pre-fill), **Duplicate**, **Edit inline**, **Delete**, and **Download**.
- **Mock/Demo Fallback Mode**: Fully operational local heuristic parser when no Gemini API Key is specified, ensuring the application remains interactive.

---

## 🛠️ Tech Stack

- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS (Dark/Light mode support)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Core State**: React Context API
- **AI Services**: Gemini 1.5 Flash (via direct endpoints) + Pollinations AI (Image variations)

---

## 📦 Installation

To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ImagineFlow-AI.git
   cd ImagineFlow-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment (Vercel Ready)

This repository is optimized for one-click Vercel deployments:

1. Import the project into Vercel.
2. In the **Environment Variables** configuration, add:
   - `VITE_GEMINI_API_KEY`: *(Optional)* Your Google AI Studio API Key. If left empty, the application runs gracefully in Demo Mode.
3. Deploy. The single-page router and Tailwind builds compile automatically.

---

## 🔮 Future Improvements

1. **Local Base64 Caching**: Store generated variations directly in IndexedDB for offline history viewing.
2. **Preset Customizer**: Allow users to save their own custom layout templates and sliders.
3. **Prompt Diff Viewer**: Introduce an inline text diff viewer showing word-by-word differences between original and enhanced prompts.
