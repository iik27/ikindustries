
# IK Labs Portfolio

This is a modern portfolio website for **IK Labs**, specializing in professional website development, mobile application development, and robust company systems.

## Setup & Configuration

### 1. Gemini AI API Key
This project uses **Genkit** with Google Gemini. To enable the AI features (AI Assistant & Tech Stack Analysis):
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Create a new API Key.
3. Create/Open the `.env` file in the root directory.
4. Add the following line:
   ```env
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   ```

### 2. Local Development
1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the development server.
3. Open `http://localhost:9002` in your browser.

## Deployment

### 1. Using Firebase (Recommended)
Click the **"Publish"** button in your Firebase Studio dashboard. Ensure you have set the `GOOGLE_GENAI_API_KEY` in your deployment secrets/environment variables.

### 2. Using Vercel
1. Connect this repo to Vercel.
2. Add the `GOOGLE_GENAI_API_KEY` Environment Variable.
3. Click **"Deploy"**.

## Key Features
- **Futuristic UI:** Laboratory-themed design with smooth Anime.JS animations.
- **AI Assistant:** Interactive chatbot (LabOS) for direct consultation.
- **Smart Tech Stack:** AI-powered analysis of technology benefits and features.
- **Bilingual Support:** Full Indonesian and English translations.
