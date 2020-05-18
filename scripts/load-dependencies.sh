#!bin/sh

ENV=$1

#WebSDK 
aws s3 cp s3://ownid-sdks-bucket/$ENV/web-ui-sdk/latest src/assets/ownid-web-ui-sdk --recursive

