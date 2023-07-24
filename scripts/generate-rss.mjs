// import { Feed } from 'feed';
const Feed = require("feed");
// import { writeFileSync } from 'fs';
const fs = require("fs");
import PostJson from '../.contentlayer/generated/Post/_index';
import metadata from '../data/metadata.js';

const master = {
  title: metadata.title,
  description: metadata.description,
  author: metadata.author,
};

const feed = new Feed({
  title: metadata.title,
  description: metadata.description,
  id: `https://ydkblog.vercel.app/`,
  link: `https://ydkblog.vercel.app/`,
  language: 'ko',
  image: `https://ydkblog.vercel.app/images/base.jpg`,
  favicon: `https://ydkblog.vercel.app/favicon.ico`,
  copyright: `All rights reserved since 2023, ${master.author}`,
  generator: 'generate-rss',
  feedLinks: {
    json: `https://ydkblog.vercel.app/json`,
    atom: `https://ydkblog.vercel.app/atom`,
  },
  author: master,
});

PostJson.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: post._raw.flattenedPath,
    link: `https://ydkblog.vercel.app/${post._raw.flattenedPath}`,
    description: post.description,
    content: post.body.raw,
    author: [master],
    date: new Date(post.date),
    category: post.tag,
  });
});

// feed.addCategory('study and games');

// Output: RSS 2.0
// fs.writeFileSync('out/rss.xml', feed.rss2(), 'utf-8');
// // Output: Atom 1.0
// fs.writeFileSync('out/rss-atom.xml', feed.atom1(), 'utf-8');
// // Output: JSON Feed 1.0
// fs.writeFileSync('out/feed.json', feed.json1(), 'utf-8');
