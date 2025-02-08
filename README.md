# Made by Sagar Kapoor

# Next.js Startup Network Finder

## Overview
This is a full-stack startup network finder application built with Next.js. The platform connects founders with investors or mentors based on specific criteria. The application includes authentication, a credit-based search system, and integration with AI models (Gemini API or ChatGPT API) to provide intelligent search results.

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Node.js
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **Caching & Fast Access:** Redis
- **Email Processing:** Gmail API
- **Job Scheduling:** Cron Job (runs every 1 minute)
- **CORS Handling:** Configured for secure API access

## Features
### Search API
1. The frontend sends the user’s input to the backend via an API request.
2. The backend fetches relevant data from the database and sends it along with the user query to Gemini API (or ChatGPT API).
3. The AI processes the data and user query to return the best possible response.
4. The response is sent back to the frontend for display.

> **Note:** Gemini API is free of cost.

### Credit System
- Each user starts with **5 credits**.
- Every search request **reduces 1 credit**.
- If a user’s credits reach **0**, they receive an error message:
  > "Your credits are exhausted. Please check your email to recharge."
- An email is **automatically sent** to the user, instructing them to send a recharge request.

### Recharge System
- Users can **recharge** their credits by sending an email with the subject: 
  > "recharge 5 credits"
- The backend continuously monitors emails using **Gmail API** (runs every 1 minute).
- If a recharge email is detected, **5 credits are added** to the user’s account.
- If the same user tries to recharge again, they receive an email:
  > "Sorry, we are not offering additional credits at this time."
- **Manually Trigger Recharge:** You can manually trigger the recharge email detection by sending a GET request to `/api/cron`. 
- **Cron Job Limit:** The cron job is limited to **once per day**.

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/startup-network-finder.git
   cd startup-network-finder
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and configure the following:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_CHATGPT_API_KEY=your-chatgpt-api-key
   MONGODB_URI=your-mongodb-connection-string
   REDIS_URL=your-redis-url
   NEXTAUTH_SECRET=your-next-auth-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GMAIL_API_KEY=your-gmail-api-key
   CRON_SECRET=your-cron-secret
   GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
- Deploy on **Vercel** (recommended) or **any cloud provider**.
- Ensure environment variables are set in the deployment environment.
- Configure a background job to run the **Gmail API-based recharge detection** every minute.

## Links
- **Live App:** [your-live-app-link]
- **GitHub Repository:** [your-github-repo-link]

## Additional Enhancements
- **Rate Limiting:** Can be added to prevent API abuse.
- **Investor Data Caching:** Using Redis for fast access.
- **Enhanced AI Processing:** Further optimize AI-based search responses.

## License
This project is licensed under the MIT License.

