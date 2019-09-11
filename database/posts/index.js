const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const cheerio = require('cheerio');

const PUBLIC_PATH = path.resolve(__dirname, '../public/');
const POST_IMG_PATH = path.resolve(PUBLIC_PATH, 'post-img');
if (!fs.existsSync(POST_IMG_PATH)) {
  fs.mkdirSync(POST_IMG_PATH);
}

const csv_str = fs.readFileSync(path.resolve(__dirname, 'index.csv')).toString();
const csv = parse(csv_str, {
  skip_empty_lines: true,

  columns: true,
  html: true
});
const csv2 = csv.map(o => {
  o.md = fs.readFileSync(path.resolve(__dirname, `${o.id}.md`)).toString();
  o.html = md.render(o.md);
  o.images = o.image ? [o.image] : [];
  if (!o.title) {
    o.title = '';
    for (tok of o.md.split('\n')) {
      o.title += tok;
      if (!tok) break;
    }
    if (o.title.length > 60) {
      o.title = o.title.slice(0, 60) + '...';
    }
  }
  console.log(o.id, '>', o.title);
  cheerio('img', o.html).each((i, ele) => {
    const attr = cheerio(ele).attr();
    if (attr.src) {
      o.image = attr.src;
      o.images.push(attr.src);
      fs.copyFileSync(path.resolve(__dirname, attr.src), path.resolve(PUBLIC_PATH, attr.src));
    }
  });
  if (o.image) {
    fs.copyFileSync(path.resolve(__dirname, o.image), path.resolve(PUBLIC_PATH, o.image));
  }
  return o;
});

fs.writeFileSync(path.resolve(PUBLIC_PATH, 'database.json'), JSON.stringify(csv2));
module.exports = csv2;
