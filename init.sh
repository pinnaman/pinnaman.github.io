#!/bin/bash

git clone https://github.com/pinnaman/pinnaman.github.io.git
cd pinnaman.github.io/
rm -rf package-lock.json 
npm install
npm run start

