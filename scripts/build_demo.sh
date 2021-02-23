#!bin/bash

ENV=$1
GIGYA_DEMO=$2

yarn ng build demo-app --configuration=$ENV
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest

yarn ng build demo-app --configuration=${ENV}2
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest2

yarn ng build demo-app --configuration=${ENV}3
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest3

yarn ng build demo-app --configuration=${ENV}4
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_DEMO}\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html
docker build ./projects/demo-app -t ownid-demo-app:latest4

yarn ng build demo-screens-app --configuration=$ENV
if [ $ENV == "dev" ]; then
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_h6R8akoH2IWXWgIdF4H159SYevfNGX0uePEhQ29opmlkbqjCJZLslw-6Gb62brwL\"><\/script>/" projects/demo-screens-app/dist/index.html
else
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_NzFVaEWHPek9shNMmndEqNdYfpUZuNdQLZRvB_TL39dCf1EFKDfhKW1EjYMqm5tB\"><\/script>/" projects/demo-screens-app/dist/index.html
fi
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-screens-app/dist/index.html
docker build ./projects/demo-screens-app -t ownid-demo-screens-app:latest

if [ $ENV == "dev" ]; then
  yarn ng build demo-screens-app --configuration=multi1
  sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_lDQBLLF5r8zMPcjIfKBHu0GIid109KK8SgmSyHvA8trqm5g4vDl4OgG1PMH-Vql1\"><\/script>/" projects/demo-screens-app/dist/index.html
  sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-screens-app/dist/index.html
  docker build ./projects/demo-screens-app -t ownid-demo-screens-app:latest2
  
  yarn ng build demo-screens-app --configuration=multi2
  sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_ciJvtpB4KZm1qWhrhltQ15xnwqrZfZfg4sfci1qktljOQbg6QouY3hf5Hk4haTR5\"><\/script>/" projects/demo-screens-app/dist/index.html
  sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.${ENV}.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-screens-app/dist/index.html
  docker build ./projects/demo-screens-app -t ownid-demo-screens-app:latest3
fi