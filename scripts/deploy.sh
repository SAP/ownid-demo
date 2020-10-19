#!bin/sh

REPOSITORY_URI=$1
REPOSITORY_DEMO_URI=$2
IMAGE_TAG=$3
IMAGE_TAG_2=$3_
ENV=$4

# Clients update
echo Push client $REPOSITORY_URI:$IMAGE_TAG
docker tag ownid-client-app:latest $REPOSITORY_URI:$IMAGE_TAG
docker push $REPOSITORY_URI:$IMAGE_TAG

# echo Push client 2 $REPOSITORY_URI:$IMAGE_TAG_2
# docker tag ownid-client-app:latest2 $REPOSITORY_URI:$IMAGE_TAG_2
# docker push $REPOSITORY_URI:$IMAGE_TAG_2

echo Images update
kubectl apply -f manifests/$ENV/client.yaml
kubectl -n=$ENV set image deployment/ownid-client-app-deployment ownid-client-app=$REPOSITORY_URI:$IMAGE_TAG --record
#kubectl -n=$ENV set image deployment/ownid-client-app-2-deployment ownid-client-app-2=$REPOSITORY_URI:$IMAGE_TAG_2 --record

# Demo update
echo Push demo $REPOSITORY_DEMO_URI:$IMAGE_TAG to registry
docker tag ownid-demo-app:latest $REPOSITORY_DEMO_URI:$IMAGE_TAG
docker push $REPOSITORY_DEMO_URI:$IMAGE_TAG

# Demo 2 update
# echo Push demo $REPOSITORY_DEMO_URI:$IMAGE_TAG_2 to registry
# docker tag ownid-demo-app:latest2 $REPOSITORY_DEMO_URI:$IMAGE_TAG_2
# docker push $REPOSITORY_DEMO_URI:$IMAGE_TAG_2

echo Images update
kubectl apply -f manifests/$ENV/demo.yaml
kubectl -n=$ENV set image deployment/ownid-demo-app-deployment ownid-demo-app=$REPOSITORY_DEMO_URI:$IMAGE_TAG --record
# kubectl -n=$ENV set image deployment/ownid-demo-app-2-deployment ownid-demo-app-2=$REPOSITORY_DEMO_URI:$IMAGE_TAG_2 --record

# Demo 2 update
echo Push demo $REPOSITORY_DEMO_URI:$IMAGE_TAG_2 to registry
docker tag ownid-demo-app:latest2 $REPOSITORY_DEMO_URI:$IMAGE_TAG_2
docker push $REPOSITORY_DEMO_URI:$IMAGE_TAG_2

echo Updating DEMO2
kubectl -n=$ENV set image deployment/ownid-demo-app-2-deployment ownid-demo-app-2=$REPOSITORY_DEMO_URI:$IMAGE_TAG_2 --record