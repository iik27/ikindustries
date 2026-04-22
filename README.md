
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

### 2. Deployment Configuration (ENV)

#### **Vercel**
Jika Anda menggunakan Vercel, pastikan memasukkan variabel berikut di dashboard Vercel:
1. Masuk ke proyek Anda di Vercel.
2. Buka **Settings** > **Environment Variables**.
3. Tambahkan Key: `GOOGLE_GENAI_API_KEY`
4. Masukkan Value: `kunci_api_anda_disini`
5. Klik **Save** dan lakukan **Redeploy** untuk menerapkan perubahan.

#### **Firebase App Hosting**
Jika menggunakan Firebase, Anda bisa mengatur secrets melalui Firebase Console atau menggunakan `apphosting.yaml`.

### 3. Local Development
1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the development server.
3. Open `http://localhost:9002` in your browser.

## Key Features
- **Futuristic UI:** Laboratory-themed design with advanced **Anime.JS** character animations.
- **AI Assistant:** Interactive chatbot (LabOS) for direct consultation.
- **Smart Tech Stack:** AI-powered analysis of technology benefits and features.
- **Bilingual Support:** Full Indonesian and English translations across all sections.
- **Responsive Design:** Optimized for all devices with a professional glassmorphism aesthetic.
