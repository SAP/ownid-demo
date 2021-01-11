#!bin/sh

ENV=$1
BUILD_NUMBER=$2

# Demo update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-demo:${BUILD_NUMBER-}
echo Push demo $IMAGE_URI to registry
docker tag ownid-demo-app:latest $IMAGE_URI
docker push $IMAGE_URI

echo Images update
kubectl apply -f manifests/$ENV/demo.yaml
kubectl -n=$ENV set image deployment/ownid-demo-app-deployment ownid-demo-app=$IMAGE_URI --record

# Demo 2 update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-demo-2:${BUILD_NUMBER-}
echo Push demo2 $IMAGE_URI to registry
docker tag ownid-demo-app:latest2 $IMAGE_URI
docker push $IMAGE_URI

echo Updating DEMO2
kubectl -n=$ENV set image deployment/ownid-demo-app-2-deployment ownid-demo-app-2=$IMAGE_URI --record

# Demo 3 update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-demo-3:${BUILD_NUMBER-}
echo Push demo3 $IMAGE_URI to registry
docker tag ownid-demo-app:latest3 $IMAGE_URI
docker push $IMAGE_URI

echo Updating DEMO3
kubectl -n=$ENV set image deployment/ownid-demo-app-3-deployment ownid-demo-app-3=$IMAGE_URI --record


# Demo 4 update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-demo-4:${BUILD_NUMBER-}
echo Push demo4 $IMAGE_URI to registry
docker tag ownid-demo-app:latest4 $IMAGE_URI
docker push $IMAGE_URI

echo Updating DEMO4
kubectl -n=$ENV set image deployment/ownid-demo-app-4-deployment ownid-demo-app-4=$IMAGE_URI --record