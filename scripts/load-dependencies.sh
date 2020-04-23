#!bin/sh

ENV=$1

#WebSDK 
aws s3 cp s3://ownid-sdks-bucket/$ENV/web-ui-sdk/latest WebApp/wwwroot/js --recursive

#ServerSDK
aws s3 cp s3://ownid-sdks-bucket/$ENV/server-sdks/dotnetcore3/latest WebApp/ownid --recursive
