#!bin/sh

pwd

echo branch: $1

if [ $1 = develop ]; then 
    echo executing script for $1
    # 1 client app
    yarn ng build --configuration=dev
    cd dist
    sed -i -e 's/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_s5-gLs4aLp5FXluP8HXs7_JN40XWNlbvYWVCCkbNCqlhW6Sm5Z4tXGGsHcSJYD3W\"><\/script>/' index.html
    cd ..
    docker build  -t ownid-client-app:latest .
    
    # 2 client app
    yarn ng build --configuration=dev2
    cd dist
    sed -i -e 's/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_s5-gLs4aLp5FXluP8HXs7_JN40XWNlbvYWVCCkbNCqlhW6Sm5Z4tXGGsHcSJYD3W\"><\/script>/' index.html
    cd ..
    docker build  -t ownid-client-app:latest2 .

    # demo app
    yarn ng build demo-app --configuration=dev
    cd projects/demo-app/dist
    sed -i -e 's/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_hOdIVleWrXNvjArcZRwHJLiGA4e6Jrcwq7RfH5nL7ZUHyI_77z43_IQrJYxLbiq_\"><\/script>/' index.html
    cd ..
    docker build -t ownid-demo-app:latest . && cd ../..

else
    echo executing not develop script for $1
    # 1 client app
    yarn ng build --configuration=staging
    cd dist
    sed -i -e 's/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_dEHMimJM2kxcz8gaoI1Sss9kohyJ6LP17qDYd2UIlUfNowsPglEUANJX7R812-uh\"><\/script>/' index.html
    cd ..
    docker build  -t ownid-client-app:latest .

    # 2 client app
    yarn ng build --configuration=staging2
    cd dist
    sed -i -e 's/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_DS2fdSlSzClFXUfkKHaxJq9-Zknssg2UHamCntjp2jRcL74a_x5HbhDxvHZ6a4q2\"><\/script>/' index.html
    cd ..
    docker build  -t ownid-client-app:latest2 .


    # demo app
    yarn build:demo
    cd projects/demo-app/dist
    sed -i -e 's/<!--gigya-->((.)*)<!--gigya-->/<script src=\"https:\/\/cdns.gigya.com\/js\/gigya.js?apikey=3_O4QE0Kk7QstG4VGDPED5omrr8mgbTuf_Gim8V_Y19YDP75m_msuGtNGQz89X0KWP\"><\/script>/' index.html
    cat index.html
    ls -las
    cd ..
    docker build -t ownid-demo-app:latest . && cd ../..

fi
