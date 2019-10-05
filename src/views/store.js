import { writable, readable } from 'svelte/store';
import _ from 'lodash';
import axios from 'axios';
import { get } from 'svelte/store';

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

async function getContent(type, num) {
  const $contents = get(contents);
  if (!(type in $contents)) {
    console.error($contents);
    console.error($contents[type]);
    throw new Error(`content from type "${type}" id not exist`);
  }
  num = _.toInteger(num);
  const mx = _.max(_.keys($contents[type]).map(_.toInteger));
  if (num < 1) num = mx;
  else if (num > mx) num = 1;
  const res = _.get($contents[type], num, null);
  if (res.html && _.startsWith(res.html, '/database/')) {
    res.html = await axios.get(res.html).then(r => r.data);
  }
  // console.log(type, num, res);
  return res;
}

function createModalData() {
  const { subscribe, set, update } = writable(null);
  const val = () => get({ subscribe });
  return {
    subscribe,
    reset: () => set(null),
    setContent: async (type, num) => set(await getContent(type, num)),
    setPost: async num => set(await getContent('posts', num)),
    setShowcase: async num => set(await getContent('showcase', num)),
    setFixed: async num => set(await getContent('fixed', num)),
    goNum: async num => set(await getContent(val().type, num)),
    goPrev: async () => set(await getContent(val().type, val().num - 1)),
    goNext: async () => set(await getContent(val().type, val().num + 1))
  };
}

export const modalData = createModalData();
