# Real Estate Client Intake & Scheduling Automation

This project is a full-stack automation prototype for a real estate brokerage, built as a take-home assignment for RBB Automations (Boston Automations).

## Project Description

This app automates the process of capturing leads, sending confirmations, and keeping agents updated in real time. It consists of:
- **Lead-Capture Form:** For prospects to book a property viewing.
- **n8n Workflow:** Handles form submissions, saves leads to Supabase, sends confirmation emails/SMS, and updates lead status.
- **Agent Dashboard:** Real-time dashboard listing all leads and their current status.

**Tech Stack:**
- Next.js (App Router, shadcn/ui, Tailwind CSS)
- Supabase (Database, Realtime)
- n8n (Workflow automation)
- Resend (Email), Twilio (SMS)
- Vercel (Deployment)

---

## Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/bluefound/RRB_Automations-Boston-.git
cd real-estate-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the `real-estate-app` directory with:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your-n8n-production-webhook-url
```

- Get your Supabase URL and anon key from your Supabase project (Settings > API).
- Get your n8n webhook URL from your n8n Cloud workflow (production URL, not test URL).

### 4. Run Locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### 5. Deploy
- Push to GitHub.
- Import the repo to [Vercel](https://vercel.com/), set the same environment variables, and deploy.

---

## Live Demo
[Live on Vercel](https://your-vercel-app-url.vercel.app)

---

## Notes

### CORS
- For local development, add `http://localhost:3000` (or your port) to the CORS settings in your n8n webhook node's Response Headers.
- For production, add your Vercel domain (e.g., `https://your-vercel-app-url.vercel.app`).

### SMS (Twilio)
- Twilio trial accounts may restrict sending SMS to unverified numbers or certain countries.
- In production, use a paid Twilio account and update the workflow as needed.

### Security
- **Never expose your Supabase service role key in frontend code or public repos.**
- Only use the anon/public key in `.env.local` and Vercel.

### Limitations
- SMS sending may be restricted in some regions (e.g., Nigeria) on Twilio trial.
- The dashboard is public for demo purposes; add authentication for production use.

---

## Contact
For questions or demo requests, contact [your email or LinkedIn].
