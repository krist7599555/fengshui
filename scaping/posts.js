const posts = require(__dirname + '/profile.json');
const shell = require('shelljs');
const cheerio = require('cheerio');
const fs = require('fs');
const _ = require('lodash');
const HEADER = `-H 'authority: m.facebook.com' -H 'pragma: no-cache' -H 'cache-control: no-cache' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'`;
const COOKIE = __dirname + '/cookie.txt';

const CURL = text => {
  const cmd = `curl -L -s -b "${COOKIE}" ` + text;
  console.log(cmd);
  shell.exec(cmd);
};

function download(link, file) {
  shell.exec(`curl -L -s -b "${COOKIE}" "${link}" > "${file}"`);
}

function fHtml(link) {
  const tmp = __dirname + '/tmp.html';
  // link = link.replace('pcb.', 'pcb\\.'); // fixed bug album
  shell.exec(`curl -s -b "${COOKIE}" "${link}" > "${tmp}"`);
  const res = fs.readFileSync(tmp).toString();
  // console.log(link);
  // shell.rm(tmp);
  return res;
}

function fPhoto2Cache(link) {
  return cheerio('a', fHtml(link)).attr('href');
}
function fPhoto2FullSizeLink(link) {
  const href = cheerio('.attachment .mfss a:first-child', fHtml(link)).attr('href');
  return fPhoto2Cache('https://m.facebook.com' + href);
}

for (const { type, link } of posts) {
  // if (type == 'photo') continue;
  const ch = cheerio.load(fHtml(link));
  ch('br').replaceWith('\n');
  const body = ch('._2vj8')
    .text()
    .replace(/\n /g, '\n');
  const id = _.get(body.match(/[0-9]{4}/), 0, null);

  if (!id) continue;
  // fs.writeFileSync(`${__dirname}/${id}.md`, body);

  const imgs = [];
  const firstimg =
    'https://m.facebook.com' +
    ch('#MPhotoContent .attachment.mfss .atb span._2vja.mfss.fcg a').attr('href');
  CURL(`-L "${fPhoto2Cache(firstimg)}" > ${id}-${'S'}.jpg`);
  // return;
  ch('.attachment > a').each((i, el) => {
    const img = 'https://m.facebook.com' + el.attribs.href;
    const bigimg = fPhoto2FullSizeLink(img);
    console.log(bigimg);
    CURL(`-L "${bigimg}" > ${id}-${i}.jpg`);
    // imgs.push(bigimg);
  });
  // console.log({ body, imgs });
  // console.log(html);
  // break;
}
