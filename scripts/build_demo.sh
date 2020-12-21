#!bin/bash

ENV=$1
GIGYA_DEMO=$2

yarn ng build demo-app --configuration=$ENV
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest .

yarn ng build demo-app --configuration=${ENV}2
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest2 .

yarn ng build demo-app --configuration=${ENV}3
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest3 .


yarn ng build demo-app --configuration=${ENV}4
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest4 .
