from src.ml_obj_detection import detect
from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Patient(BaseModel):
    age : int
    sex : int
    cp : int
    trtbps : int
    chol : int
    fbs : int
    restecg : int
    thalachh : int
    exng : int
    oldpeak : float
    slp : int
    caa : int
    thall : int
    


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/uploadData")
async def create_upload_file(patient:Patient):
   print(patient)
   out_put= detect(patient)
   return{"objects": out_put}