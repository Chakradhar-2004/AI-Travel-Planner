# 🧭 AI Travel Planner

An intelligent, chat-based travel assistant that helps users plan trips with ease. Built with **React**, **Firebase**, **FastAPI**, **PostgreSQL**, and powered by **Gemini AI** for personalized travel recommendations.

---

## 🚀 Features

- 💬 **Conversational Trip Planning** – Users can chat with the AI to discover destinations, activities, and itineraries.
- 🕓 **Session-Based Chat History** – Stores user messages and AI responses for seamless context across sessions.
- 🔐 **User Authentication** – Tracks users via Firebase and persists session data.
- 🗺️ **Smart Destination Suggestions** – Gemini AI provides contextual travel advice based on user input.
- 🌐 **Deployed on Vercel** – Ready to scale and access from anywhere.

---

## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Tailwind CSS](https://tailwindcss.com/)
- Hosted on [Vercel](https://vercel.com/)

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Gemini AI API](https://deepmind.google/technologies/gemini/)
- Session and chat storage

---

## 🧑‍💻 Setup Instructions

### 📦 Backend (FastAPI)

1. Clone the repo and install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

2. Set environment variables (e.g., Gemini API key, DB credentials).

3. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

4. Ensure PostgreSQL is running and the `Chat` table is created.

---

### 💻 Frontend (React + Firebase)

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure Firebase in `.env`:
    ```
    VITE_FIREBASE_API_KEY=...
    VITE_FIREBASE_AUTH_DOMAIN=...
    ```

4. Start the frontend dev server:
    ```bash
    npm run dev
    ```

---

## 📡 API Endpoints

### `POST /chat`
Handles sending user messages to Gemini AI and returns responses.

### `GET /chat-history`
Fetches all chat messages for a given `user_email` and `session_id`.

---

## 📷 Screenshots

> <img width="899" alt="Screenshot 2025-04-06 at 2 44 48 PM" src="https://github.com/user-attachments/assets/f6854227-29c1-4a5f-a09b-b5ca2968f95e" />
> <img width="883" alt="Screenshot 2025-04-06 at 2 46 11 PM" src="https://github.com/user-attachments/assets/67dea917-48e2-433e-98c4-a24d57563db0" />
> <img width="1100" alt="Screenshot 2025-04-06 at 2 47 18 PM" src="https://github.com/user-attachments/assets/f52f2347-1192-4b3f-9f18-2dcb8ad07156" />
> <img width="1275" alt="Screenshot 2025-04-06 at 2 43 39 PM" src="https://github.com/user-attachments/assets/1880eefa-e228-4c94-8918-9c2123cee175" />
> <img width="924" alt="Screenshot 2025-04-06 at 2 47 31 PM" src="https://github.com/user-attachments/assets/3ed7ed48-fc01-41cc-b684-333d5e0c3b95" />






---

## 📌 Future Improvements

- Add trip itinerary export (PDF or Google Calendar)
- Integrate location/weather APIs
- Multi-language support
- Real-time chat enhancements

---

## 🧠 Powered By

- [Gemini AI](https://deepmind.google/technologies/gemini/)
- [LangChain](https://www.langchain.com/)
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)
- [FastAPI](https://fastapi.tiangolo.com/)

---

## 📄 License

MIT License

---

## ✨ Contributions

Pull requests are welcome! If you have ideas for features or improvements, feel free to open an issue.

