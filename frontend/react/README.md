# React Challenge - Chess

Author: @itsba2

## Prerequisites

You need [docker](https://www.docker.com/) installed.

## Build and Run Docker

First clone the repository

```
git clone https://github.com/itsba2/selectcode-challenges.git
```

On your terminal, go to /frontend/react directory where you cloned the repository

```
cd ./selectcode-challenges/frontend/react
```

Then, build and run docker

```
docker build -t react_chess .
docker run --name react_chess_container -p 5173:5173 react_chess
```

Now, go to [http://localhost:5173/](http://localhost:5173/) on your browser and enjoy the game!

## Code

### Components

- **Board**: The component where game logic is implemented.
- **Square**: The component where each square is represented.
- **Piece**: The component where each piece on squares is represented.

### Helpers

Helpers are used for simplifying the code in Components.

### Assets
- [White queen](https://en.wikipedia.org/wiki/File:Chess_qlt45.svg)
- [Black queen](https://en.wikipedia.org/wiki/File:Chess_qdt45.svg)
- [White knight](https://en.wikipedia.org/wiki/File:Chess_nlt45.svg)
- [Black knight](https://en.wikipedia.org/wiki/File:Chess_ndt45.svg)
