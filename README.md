# RoastMyEssay 🔥

A fun Next.js application that roasts college essays using AI. Get brutally honest feedback from a Gen Z college admissions officer!

## Features

- Paste your college essay and get an AI-powered roast
- Receive an admission chance score
- Get specific suggestions for improvement
- Share your roast on WhatsApp or TikTok
- Modern, Gen Z-inspired UI with Tailwind CSS

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The easiest way to deploy this app is using Vercel:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add your OpenAI API key in the environment variables section
5. Deploy!

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- OpenAI API (GPT-4)
- React Icons

## License

MIT 

## Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In your project, go to Authentication > Get Started. Enable Email/Password and Google sign-in methods.
3. Go to Project Settings > General and find your Firebase SDK config.
4. In `app/components/AuthPage.js`, replace the following with your actual config:

```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};
```

5. Save and restart your dev server if needed.

Now, users will see a full-page login/signup screen before accessing the app. 