from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field
import json

app = FastAPI()


# Data schema for tasks
class Task(BaseModel):
    id: int = Field(gt=0)
    title: str
    description: str
    done: bool = False


# Fake DB where tasks are stored
db_path = "fake_tasks_db.json"
with open(db_path, "r") as fake_db:
    fake_tasks_db = json.load(fake_db)


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
        raise HTTPException(
            status_code=404, detail="The task you are looking for does not exist.")
    return task


@ app.post("/tasks")
async def create_task(new_task: Task):
    """
    Create a new task.
    """
    new_task_encoded = jsonable_encoder(new_task)
    fake_tasks_db.append(new_task_encoded)
    tasks_json = json.dumps(fake_tasks_db, indent=2)
    with open(db_path, "w") as fake_db:
        fake_db.write(tasks_json)
    return new_task_encoded


@ app.put("/tasks/{task_id}")
async def update_task(task_id: int, updated_task: Task):
    """
    Update the details of an existing task.
    """
    task = search_in_db("id", task_id)
    if task not in fake_tasks_db:
        raise HTTPException(
            status_code=404, detail="The task you are looking for does not exist.")

    updated_task_encoded = jsonable_encoder(updated_task)

    for task in fake_tasks_db:
        if task["id"] == task_id:
            task.update(updated_task_encoded)

    tasks_json = json.dumps(fake_tasks_db, indent=2)
    with open(db_path, "w") as fake_db:
        fake_db.write(tasks_json)
    return updated_task_encoded


@ app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    """
    Delete a task.
    """
    task = search_in_db("id", task_id)
    if not task:
        raise HTTPException(
            status_code=404, detail="The task you are looking for does not exist.")

    fake_tasks_db.remove(task)
    tasks_json = json.dumps(fake_tasks_db, indent=2)
    with open(db_path, "w") as fake_db:
        fake_db.write(tasks_json)
    return task_id
