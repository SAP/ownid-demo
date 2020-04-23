#!bin/sh

REPOSITORY_URI=$1
IMAGE_TAG=$2
ENV=$3

echo Pushing image $REPOSITORY_URI:$IMAGE_TAG to registry
docker tag client-app:latest $REPOSITORY_URI:$IMAGE_TAG
docker push $REPOSITORY_URI:$IMAGE_TAG

echo Updating image in Cluster deployment
kubectl -n=$ENV set image deployment/ownid-client-app-deployment ownid-client-app=$REPOSITORY_URI:$IMAGE_TAG --record