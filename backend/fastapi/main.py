from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
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


def search_in_db(key: str, value):
    """
    Search DB for a specific key-value pair.
    """
    for task in fake_tasks_db:
        if task[key] == value:
            return task


@ app.get("/tasks")
async def get_tasks():
    """
    Retrieve a list of all tasks.
    """
    return fake_tasks_db


@ app.get("/tasks/{task_id}")
async def get_task_by_id(task_id: int):
    """
    Retrieve the details of a specific task.
    """
    task = search_in_db("id", task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@ app.post("/tasks")
async def create_task(new_task: Task):
    """
    Create a new task.
    """
    new_task_json = jsonable_encoder(new_task)
    fake_tasks_db.append(new_task_json)
    print("TASKS DB\n", fake_tasks_db)
    return new_task_json