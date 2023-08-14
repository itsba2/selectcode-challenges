# React Challenge - Chess

Author: @itsba2

## Prerequisites

You need `docker` installed.

## Build and Run Docker

First clone the repository

```
git clone https://github.com/itsba2/selectcode-challenges.git
```

On your terminal, find the /frontend/react directory where you cloned the repository

```
cd /path/to/repository/frontend/react
```

Then, build and run docker

```
docker build -t react_chess .
docker run --name react_chess_container -p 5173:5173 react_chess
```

Now, go to [http://localhost:5173/](http://localhost:5173/) on your browser and enjoy the game!

## Credits
- [White queen](https://en.wikipedia.org/wiki/File:Chess_qlt45.svg)
- [Black queen](https://en.wikipedia.org/wiki/File:Chess_qdt45.svg)
- [White knight](https://en.wikipedia.org/wiki/File:Chess_nlt45.svg)
- [Black knight](https://en.wikipedia.org/wiki/File:Chess_ndt45.svg)
