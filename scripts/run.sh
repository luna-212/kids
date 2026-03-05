#!/bin/bash

while true
do
  npx hardhat run scripts/lend.cjs --network autheoTestnet
    sleep 20
    done &

    while true
    do
      npx hardhat run scripts/stake.cjs --network autheoTestnet
        sleep 20
        done &

wait