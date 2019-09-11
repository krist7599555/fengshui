import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;

navigator.serviceWorker.getRegistrations().then(r => {
  return Promise.all(r.map(reg => reg.unregister()));
});
