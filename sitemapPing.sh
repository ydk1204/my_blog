#!/usr/bin/env bash

#yarn sitemap
cd public
rm -rf sitemap.xml 
cd .. 
cd scripts
node ./sitemap.js

curl http://google.com/ping?sitemap=https://ydkblog.vercel.app/sitemap.xml