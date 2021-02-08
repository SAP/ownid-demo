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

# Demo demo-screens update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-demo-screens:${BUILD_NUMBER-}
echo Push demo-screens $IMAGE_URI to registry
docker tag ownid-demo-screens-app:latest $IMAGE_URI
docker push $IMAGE_URI

echo Updating demo-screens
kubectl -n=$ENV set image deployment/ownid-demo-screens-app-deployment ownid-demo-screens-app=$IMAGE_URI --record

# Demo multi1-screens update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-multi1-screens:${BUILD_NUMBER-}
echo Push multi1-screens $IMAGE_URI to registry
docker tag ownid-demo-screens-app:latest2 $IMAGE_URI
docker push $IMAGE_URI

echo Updating multi1-screens
kubectl -n=$ENV set image deployment/ownid-multi1-screens-app-deployment ownid-multi1-screens-app=$IMAGE_URI --record

# Demo multi2-screens update
IMAGE_URI=$DOCKER_URL/$ENV/demo/ownid-multi2-screens:${BUILD_NUMBER-}
echo Push multi2-screens $IMAGE_URI to registry
docker tag ownid-demo-screens-app:latest3 $IMAGE_URI
docker push $IMAGE_URI

echo Updating multi2-screens
kubectl -n=$ENV set image deployment/ownid-multi2-screens-app-deployment ownid-multi2-screens-app=$IMAGE_URI --record