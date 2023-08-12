#!/bin/bash +x
HOME=`pwd`

cd $HOME/main-page
npm run build

cd $HOME/game
npm run build

echo "done."
