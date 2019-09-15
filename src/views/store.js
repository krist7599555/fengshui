import { writable, readable } from 'svelte/store';
import _ from 'lodash';
import axios from 'axios';

export const contents = readable(null, function start(set) {
  axios.get('/database/list.txt').then(res => {
    const arr = res.data
      .trim()
      .replace(/\.\//g, '')
      .split('\n')
      .map(s => s.split('/'));
    const obj = {};
    for (const [grp, fle] of arr) {
      obj[grp] = obj[grp] || {};
      const num = fle.match(/^\d+/)[0];
      const ext = fle.match(/\w+$/)[0];
      obj[grp][num] = obj[grp][num] || {
        type: grp,
        num: _.toInteger(num)
      };
      switch (ext) {
        case 'md':
        case 'html':
          obj[grp][num][ext] = `/database/${grp}/${fle}`;
          break;
        case 'jpg':
        case 'jpeg':
        case 'webp':
        case 'png':
          if (fle.includes('-S') || grp == 'showcase') {
            obj[grp][num].img = `/database/${grp}/${fle}`;
          } else {
            obj[grp][num].imgs = obj[grp][num].imgs || [];
            obj[grp][num].imgs.push(`/database/${grp}/${fle}`);
          }
      }
    }
    set(obj);
  });
  return function stop() {};
});

let $contents = null;
contents.subscribe(val => ($contents = val));

async function getContent(type, num) {
  if (!(type in $contents, type)) {
    console.error($contents);
    console.error($contents[type]);
    throw new Error(`content from type "${type}" id not exist`);
  }
  num = _.toInteger(num);
  const mx = _.max(_.keys($contents[type]).map(_.toInteger));
  if (num < 1) num = mx;
  else if (num > mx) num = 1;
  const res = _.get($contents[type], num, null);
  if (res.html) {
    res.html = await axios.get(res.html).then(r => r.data);
  }
  console.log(type, num, res);
  return res;
}

function createModalData() {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    reset: () => set(null),
    setContent: async (type, num) => set(await getContent(type, num)),
    setPost: async num => set(await getContent('posts', num)),
    setShowcase: async num => set(await getContent('showcase', num)),
    setFixed: async num => set(await getContent('fixed', num)),
    goNum: num => update(async n => await getContent(n.type, num)),
    goPrev: () => update(async n => await getContent(n.type, n.num - 1)),
    goNext: () => update(async n => await getContent(n.type, n.num + 1))
  };
}

export const modalData = createModalData();
