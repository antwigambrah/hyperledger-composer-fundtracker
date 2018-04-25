#!/bin/bash

cd ..

cd ..

cd ..

cd fabric-tools

export FABRIC_VERSION=hlfv11

./stopFabric.sh

# stop all docker images
./teardownFabric.sh

# start fabric
./startFabric.sh

cd ..

rm -rf .composer

cd hyperledger/decentralizedgov-network

# generate a business network archive
composer archive create -t dir -n .

composer card create -p connection.json -u PeerAdmin -c ~/fabric-tools/fabric-scripts/hlfv11/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/admincerts/Admin@org1.example.com-cert.pem -k ~/fabric-tools/fabric-scripts/hlfv11/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin


composer card import -f PeerAdmin@decentralizedgov-network.card


composer runtime install -c PeerAdmin@decentralizedgov-network -n decentralizedgov-network

composer network start -c PeerAdmin@decentralizedgov-network -a decentralizedgov-network@0.0.1.bna -A admin -S adminpw


composer card import -f admin@decentralizedgov-network.card

composer network ping -c admin@decentralizedgov-network

cd ..

cd server 

nodemon -L --watch app server.js




# # copy networkadmin.card to /tmp/composer so it can be used by the REST server
# # create the directory if not exists yet
# if [ ! -d "/tmp/composer" ]; then
# 	mkdir /tmp/composer
# fi
# cp networkadmin.card /tmp/composer
