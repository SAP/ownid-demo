#!bin/sh

REPOSITORY_URI=$1
IMAGE_TAG=$2
ENV=$3

echo Pushing image $REPOSITORY_URI:$IMAGE_TAG to registry
docker tag ownid-client-app:latest $REPOSITORY_URI:$IMAGE_TAG
docker push $REPOSITORY_URI:$IMAGE_TAG

echo Updating image in Cluster deployment
kubectl apply -f manifests/$ENV.yaml
kubectl -n=$ENV set image deployment/ownid-client-app-deployment ownid-client-app=$REPOSITORY_URI:$IMAGE_TAG --record
kubectl -n=$ENV set image deployment/ownid-client-app-2-deployment ownid-client-app-2=$REPOSITORY_URI:$IMAGE_TAG --record