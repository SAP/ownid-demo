#!bin/sh

REPOSITORY_URI=$1
REPOSITORY_DEMO_URI=$2
IMAGE_TAG=$3
IMAGE_TAG_2=$3_
ENV=$4

echo Pushing image $REPOSITORY_URI:$IMAGE_TAG to registry
docker tag ownid-client-app:latest $REPOSITORY_URI:$IMAGE_TAG
docker push $REPOSITORY_URI:$IMAGE_TAG

docker tag ownid-client-app:latest2 $REPOSITORY_URI:$IMAGE_TAG_2
docker push $REPOSITORY_URI:$IMAGE_TAG_2

echo Pushing image $REPOSITORY_DEMO_URI:$IMAGE_TAG to registry
docker tag ownid-demo-app:latest $REPOSITORY_DEMO_URI:$IMAGE_TAG
docker push $REPOSITORY_DEMO_URI:$IMAGE_TAG

kubectl apply -f manifests/$ENV.yaml

sleep 3
#image tag separate
echo Updating Client-app image in Cluster deployment
kubectl -n=$ENV set image deployment/ownid-client-app-deployment ownid-client-app=$REPOSITORY_URI:$IMAGE_TAG --record
kubectl -n=$ENV set image deployment/ownid-client-app-2-deployment ownid-client-app-2=$REPOSITORY_URI:$IMAGE_TAG_2 --record

echo Updating Demo-app image in Cluster deployment
kubectl -n=$ENV set image deployment/ownid-demo-app-deployment ownid-demo-app=$REPOSITORY_DEMO_URI:$IMAGE_TAG --record