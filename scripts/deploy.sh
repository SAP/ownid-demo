#!bin/sh

ENV=$1

# Clients update
# IMAGE_URI=$ARTIFACTORY_URL/$ENV/client/ownid-client-app_${TRAVIS_BUILD_NUMBER-}:$TRAVIS_COMMIT
# echo Push client $IMAGE_URI
# docker tag ownid-client-app:latest $IMAGE_URI
# docker push $IMAGE_URI

# echo Images update
# kubectl apply -f manifests/$ENV/client.yaml
# kubectl -n=$ENV set image deployment/ownid-client-app-deployment ownid-client-app=$IMAGE_URI --record

# Demo update
IMAGE_URI=$ARTIFACTORY_URL/$ENV/demo/ownid-demo_${TRAVIS_BUILD_NUMBER-}:$TRAVIS_COMMIT
echo Push demo $IMAGE_URI to registry
docker tag ownid-demo-app:latest $IMAGE_URI
docker push $IMAGE_URI

echo Images update
kubectl apply -f manifests/$ENV/demo.yaml
kubectl -n=$ENV set image deployment/ownid-demo-app-deployment ownid-demo-app=$IMAGE_URI --record

# Demo 2 update
IMAGE_URI=$ARTIFACTORY_URL/$ENV/demo/ownid-demo-2_${TRAVIS_BUILD_NUMBER-}:$TRAVIS_COMMIT
echo Push demo2 $IMAGE_URI to registry
docker tag ownid-demo-app:latest2 $IMAGE_URI
docker push $IMAGE_URI

echo Updating DEMO2
kubectl -n=$ENV set image deployment/ownid-demo-app-2-deployment ownid-demo-app-2=$IMAGE_URI --record

# Demo 3 update
IMAGE_URI=$ARTIFACTORY_URL/$ENV/demo/ownid-demo-3_${TRAVIS_BUILD_NUMBER-}:$TRAVIS_COMMIT
echo Push demo3 $IMAGE_URI to registry
docker tag ownid-demo-app:latest3 $IMAGE_URI
docker push $IMAGE_URI

echo Updating DEMO3
kubectl -n=$ENV set image deployment/ownid-demo-app-3-deployment ownid-demo-app-3=$IMAGE_URI --record


# Demo 4 update
IMAGE_URI=$ARTIFACTORY_URL/$ENV/demo/ownid-demo-4_${TRAVIS_BUILD_NUMBER-}:$TRAVIS_COMMIT
echo Push demo4 $IMAGE_URI to registry
docker tag ownid-demo-app:latest4 $IMAGE_URI
docker push $IMAGE_URI

echo Updating DEMO4
kubectl -n=$ENV set image deployment/ownid-demo-app-4-deployment ownid-demo-app-4=$IMAGE_URI --record