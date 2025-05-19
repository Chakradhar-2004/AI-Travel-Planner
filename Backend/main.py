from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
# from .database import SessionLocal
# from .models import Chat

import os
from dotenv import load_dotenv
import google.generativeai as genai
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import uuid


load_dotenv()

genai.configure(api_key=os.getenv("VITE_GOOGLE_GEMINI_AI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")
chat = model.start_chat(history=[])

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://ai-travel-planner-gules.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.post("/chat")
# async def chat_with_ai(request: Request, db=Depends(get_db)):
#     try:
#         data = await request.json()
#         user_message = data.get("message", "")
#         user_email = data.get("user_email", "")
#         session_id = data.get("session_id", "")

#         if not user_message or not session_id:
#             return {"response": "Missing message or session ID."}

#         response = chat.send_message(user_message)

#         db.add(Chat(
#             user_email=user_email,
#             session_id=session_id,
#             user_message=user_message,
#             ai_response=response.text,
#         ))
#         db.commit()

#         return {"response": response.text}

#     except Exception as e:
#         print("Error during chat_with_ai:", e)
#         return {"response": f"Error: {str(e)}"}
    

# @app.get("/chat-history")
# async def get_chat_history(user_email: str, session_id: str, db: Session = Depends(get_db)):
#     try:
#         chats = (
#             db.query(Chat)
#             .filter(Chat.user_email == user_email)
#             .filter(Chat.session_id == session_id)
#             .order_by(Chat.timestamp)
#             .all()
#         )
#         return [
#             {
#                 "id": str(chat.id),
#                 "message": chat.user_message,
#                 "sender": "user",
#                 "timestamp": chat.timestamp.isoformat()
#             }
#             for chat in chats
#         ] + [
#             {
#                 "id": str(uuid.uuid4()),  # to give a unique id to the AI message
#                 "message": chat.ai_response,
#                 "sender": "ai",
#                 "timestamp": chat.timestamp.isoformat()
#             }
#             for chat in chats
#         ]
#     except Exception as e:
#         return {"error": str(e)}

@app.post("/chat")
async def chat_with_ai(request: Request):  # Remove db dependency for testing
    try:
        data = await request.json()
        user_message = data.get("message", "")
        session_id = data.get("session_id", "")

        if not user_message or not session_id:
            return {"response": "Missing message or session ID."}

        response = chat.send_message(user_message)

        return {"response": response.text}

    except Exception as e:
        print("Error during chat_with_ai:", e)
        return {"response": f"Error: {str(e)}"}
