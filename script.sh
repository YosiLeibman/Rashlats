#!/bin/sh
pm2 stop all
sudo rm -rf Rashlats
git clone https://github.com/YosiLeibman/Rashlats.git
cd Rashlats
npm istall
pm2 start app.js