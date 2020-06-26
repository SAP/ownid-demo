#!bin/sh

ENV=$1
GIGYA_DEMO=$2

# demo app
yarn ng build demo-app --configuration=$ENV
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
cat projects/demo-app/dist/index.html
cd projects/demo-app && docker build -t ownid-demo-app:latest . && cd ../..