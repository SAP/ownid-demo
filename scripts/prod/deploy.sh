echo
echo Demo Prod A deployment
S3PATH=s3://demo.ownid.com/
aws s3 cp ./projects/demo-app/dist $S3PATH --recursive

echo
echo Demo Prod B deployment
S3PATH=s3://demo-b.ownid.com/
aws s3 cp ./projects/demo-app/dist $S3PATH --recursive