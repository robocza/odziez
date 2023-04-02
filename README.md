Start docker containers

```bash
docker compose build
docker compose up -d
```

Get into docker

```bash
docker exec -it --user 1000:1000 odziez-robocza-node fish
```

Install dependencies
```bash
yarn install
```

Run project (inside docker)
```bash
yarn dev
```
