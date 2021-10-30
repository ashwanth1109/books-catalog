#!/usr/bin/env bash

echo "Running start script. . ."

if [ "$1" == "run" ]
then
  # Too heavy, and some setup required before getting this to work
  # You should probably prefer the local setup below - faster to iterate, easy to start
  skaffold dev
elif [ "$1" == "install" ]
then
  cd books-msvc && npm install && cd ..
  cd client && npm install && cd ..
elif [ "$1" == "db" ]
then
  docker run -it -v mongodb:/data/db -p 27017:27017 --name books-db -d mongo:latest
elif [ "$1" == "books" ]
then
  if [ ! "$(docker ps -q -f name=books-db)" ]; then
    echo "Starting books-db container"
    docker run -it -v mongodb:/data/db -p 27017:27017 --name books-db -d mongo:latest
  else
    echo "books-db container already exists, skipping creation"
    echo "Run ./start.sh clean if you want to cleanup books-db"
  fi

  if [ -f ./books-msvc/.env ]; then
    echo "books-msvc .env file already exists, skipping copy"
  else
    echo "books-msvc .env file does not exist, copying .env.example"
    cp ./books-msvc/.env.example ./books-msvc/.env
  fi

  echo "Starting books microservice"
  cd books-msvc || exit
  npm start
elif [ "$1" == "client" ]
then

  if [ -f ./client/.env.local ]; then
    echo "client .env.local file already exists, skipping copy"
  else
    echo "client .env.local file does not exist, copying .env.example"
    cp ./client/.env.example ./client/.env.local
  fi

  cd client || exit
  npm run dev
elif [ "$1" == "lint" ]; then
    cd books-msvc || exit
    npm run lint
    cd ../client || exit
    npm run lint
elif [ "$1" == "test" ]; then
    cd books-msvc || exit
    npm run test
    cd ../client || exit
    npm run test
elif [ "$1" == "client:test" ]; then
    cd client || exit
    npm run test
elif [ "$1" == "k8s:db" ]
then
  cd infra-as-code/k8s || exit
  kubectl apply -f books-db.yaml
  kubectl rollout status deployment/mongodb-depl
  kubectl port-forward service/books-db-svc 27017:27017
elif [ "$1" == "k8s:books" ]
then
  cd infra-as-code/k8s || exit
  kubectl apply -f books-msvc.yaml
  kubectl wait --for=condition=ready deployment
  kubectl port-forward service/books-svc 4001:4001
elif [ "$1" == "k8s:client" ]
then
  cd infra-as-code/k8s || exit
  kubectl apply -f books-client.yaml
  kubectl rollout status deployment/client-depl
  kubectl port-forward service/client-svc 4000:4000
elif [ "$1" == "clean" ]
then
  echo "Executing clean up steps:"
  echo "1. Deleting db container"
  docker stop books-db
  docker rm books-db
fi
