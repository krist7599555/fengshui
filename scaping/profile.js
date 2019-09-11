const cheerio = require('cheerio');
const fs = require('fs');

cheerio.prototype.textln = function() {
  // console.log('>', this.html());
  return this.text();
};

const html = fs.readFileSync(__dirname + '/profile.html').toString();
const ch = cheerio.load(html);

const photoLink = fbid => `https://m.facebook.com/photo.php?fbid=${fbid}`;
// const albumLink = (uid, pcb) => `https://m.facebook.com/${uid}/posts/pcb.${pcb}`;
const albumLink = (uid, pcb) => `https://m.facebook.com/story.php?story_fbid=${pcb}&id=${uid}`;

const arr = [];
ch('article').each((idx, el) => {
  const store = JSON.parse(el.attribs['data-store']);
  const ft = JSON.parse(el.attribs['data-ft']);
  // console.log(cheerio('.story_body_container > :not(header)', el).textln());
  // console.log();
  switch (ft.story_attachment_style) {
    case 'photo': {
      arr.push({
        type: 'photo',
        link: photoLink(ft.photo_id)
      });
      break;
    }
    case 'album': {
      // https://m.facebook.com/story.php?story_fbid=119998329370735&id=100040817060616
      arr.push({
        type: 'album',
        link: albumLink(ft.content_owner_id_new, ft.mf_story_key),
        imgs: ft.photo_attachments_list
      });
      break;
    }
    default: {
      console.error('not handle', ft.story_attachment_style);
    }
  }
});
console.log(JSON.stringify(arr));
