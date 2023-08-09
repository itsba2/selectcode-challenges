from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()


# Data schema for tasks
class Task(BaseModel):
    id: int = Field(gt=0)
    title: str
    description: str
    done: bool = False


# Fake DB where tasks are stored
fake_tasks_db = [
    {
        "id": 1,
        "title": "Do something nice for someone I care about",
        "description": "This is a description for the task",
        "done": True,
    },
    {
        "id": 2,
        "title": "Memorize the fifty states and their capitals",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 3,
        "title": "Watch a classic movie",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 4,
        "title": "Contribute code or a monetary donation to an open-source software project",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 5,
        "title": "Solve a Rubik's cube",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 6,
        "title": "Bake pastries for me and neighbor",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 7,
        "title": "Go see a Broadway production",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 8,
        "title": "Write a thank you letter to an influential person in my life",
        "description": "This is a description for the task",
        "done": True,
    },
    {
        "id": 9,
        "title": "Invite some friends over for a game night",
        "description": "This is a description for the task",
        "done": False,
    },
    {
        "id": 10,
        "title": "Have a football scrimmage with some friends",
        "description": "This is a description for the task",
        "done": False,
    }]


@ app.get("/tasks")
async def get_tasks():
    """
    Retrieve a list of all tasks.
    """
    return fake_tasks_db
