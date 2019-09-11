#!/usr/bin/env node
// use with m.facebook https://m.facebook.com/photo.php?fbid=122864195750815
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const _ = require('lodash');
// console.log(process.argv); // [node, file, arg0, arg1]

const FB = 'https://m.facebook.com';
const html = fs.readFileSync(path.resolve(process.argv[2])).toString();
const $ = cheerio.load(html);
$('br').replaceWith('\n');
// console.log($('._tmc ._3kz9 a').attr('href'));
const objPicture = {
  ownerHref: FB + $('.msg a').attr('href'),
  ownerName: $('.msg .actor').text(),
  post: {
    thumbnail: $('.m img').attr('src'),
    markdown: $('._2vj8')
      .text()
      .replace(/\n /g, '\n')
      .replace(/ +/g, ' ')
  },
  comments: _.map($('.mUFICommentContent'), el => {
    const owner = cheerio.load(el.prev.prev);
    return {
      href: FB + cheerio('a', el).attr('href'),
      _thumbnail: cheerio('img', el).attr('src'),
      ownerHref: FB + owner('a').attr('href'),
      ownerName: owner('a').text()
    };
  })
};
const objAlbum = {
  ownerHref: FB + $('._tmc ._3kz9 a').attr('href'),
  ownerName: $('._tmc ._3kz9 a').text(),
  post: {},
  comments: _.map($('.mUFICommentContent'), el => {
    return {};
  })
};
const objStory = {
  ownerHref: FB + $('._5xu4 ._4g34 a').attr('href'),
  ownerName: $('._5xu4 ._4g34 a').text(),
  post: {
    markdown: $('._5rgt._5nk5')
      .text()
      .replace(/\n /g, '\n')
      .replace(/ +/g, ' '),
    album: _.map($('._26ii._-_b a'), el => FB + cheerio(el).attr('href'))
  },
  comments: _.map($('._333v ._2a_i .attachment a'), el => {
    return FB + cheerio(el).attr('href');
  })
};

console.log(objStory);
