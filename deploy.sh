#! /bin/sh

npm run build
docker build -t bgarel.azurecr.io/calculette-rh:latest .
docker push bgarel.azurecr.io/calculette-rh:latest
