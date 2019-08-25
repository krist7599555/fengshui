import { crossfade } from 'svelte/transition';
import { flip } from 'svelte/animate';

/*
animate:flip
in:send={{ key: todo.id }}
out:receive={{ key: todo.id }}>
*/
const [send, receive] = crossfade({});
export { send, receive, flip };
