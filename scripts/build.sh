#!bin/sh

ENV=$1
GIGYA_1=$2
GIGYA_2=$3


yarn ng build --configuration=$ENV
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_1}\"><\/script>/" dist/index.html
docker build  -t ownid-client-app:latest .
    
# 2 client app
yarn ng build --configuration=${ENV}2
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=${GIGYA_2}\"><\/script>/" dist/index.html
docker build  -t ownid-client-app:latest2 .