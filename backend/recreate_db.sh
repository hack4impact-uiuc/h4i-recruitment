#!/bin/bash
docker_ps_out=$(docker ps | grep 'mongo')
read -ra docker_args <<< "$docker_ps_out"
docker_id=${docker_args[0]}
docker stop $docker_id
echo y | docker system prune
echo y | docker volume prune
docker run -v mongodbvol:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -p 27017:27017 -d mongo
echo "recreating DB and populating..."
sleep 2
dotenv yarn populatedb