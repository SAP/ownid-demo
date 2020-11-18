#!bin/sh

ENV=$1

# demo app
yarn ng build demo-app --configuration=prod
sed -i -r -e "s/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_O4QE0Kk7QstG4VGDPED5omrr8mgbTuf_Gim8V_Y19YDP75m_msuGtNGQz89X0KWP\"><\/script>/" projects/demo-app/dist/index.html
sed -i -r -e "s/<!--ownid-->((.)*)<!--ownid-->/<script src=\"https:\/\/cdn.ownid.com\/js\/gigya-sdk.es5.js\"><\/script>/" projects/demo-app/dist/index.html

