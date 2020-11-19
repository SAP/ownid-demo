#!bin/sh

ENV=$1
GIGYA_DEMO=$2

# demo app
yarn ng build demo-app --configuration=$ENV
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
#cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest . && cd ../..

yarn ng build demo-app --configuration=${ENV}2
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
#cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest2 . && cd ../..

yarn ng build demo-app --configuration=${ENV}3
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
#cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest3 . && cd ../..


yarn ng build demo-app --configuration=${ENV}4
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
#cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest4 . && cd ../..
