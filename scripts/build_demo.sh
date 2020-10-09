#!bin/sh

ENV=$1
GIGYA_DEMO=$2
GIGYA_DEMO_2=$3

# demo app
yarn ng build demo-app --configuration=$ENV
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.ownid.com\/${ENV}\/js\/latest\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest . && cd ../..

# demo 2 app
# yarn ng build demo-app --configuration=${ENV}2
# sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO_2}\"><\/script>/" projects/demo-app/dist/index.html
# sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.ownid.com\/${ENV}\/js\/latest\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
# cat projects/demo-app/dist/index.html
# cd projects/demo-app && docker build -t ownid-demo-app:latest2 . && cd ../..

yarn ng build demo-app --configuration=staging2
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.ownid.com\/${ENV}\/js\/latest\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest2 . && cd ../..