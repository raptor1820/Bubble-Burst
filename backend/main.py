from fastapi import FastAPI
import uvicorn
from ml_utils import driver
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(url):
    print(url)
    try:
        return driver(url)
    except:
        return {"error": "error"}
    
# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=3000)