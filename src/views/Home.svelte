<script>
  import { fullpage, licenseKey } from "../libs/fullpage.js";
  import { tick, onMount } from "svelte";
  let visible = [true, true, true, true];
  // $: console.log(visible);
  async function reload(index) {
    visible[index] = false;
    await tick();
    visible[index] = true;
  }
  onMount(async () => {
    const fullpage_api = new fullpage("#fullpage", {
      scrollOverflow: false,
      licenseKey: licenseKey,
      async onLeave(ol, nw) {
        if (ol.index == 3 && nw.index == 2) return;
        await reload(nw.index);
      }
    });
    // fullpage_api.moveTo(0);
    await tick();
    await reload(0);
  });
  import Slide1 from "./Slide1.svelte";
  import Slide2 from "./Slide2.svelte";
  import Slide3 from "./Slide3.svelte";
  import Slide4 from "./Slide4.svelte";
</script>

<div id="fullpage">
  <div class="section">
    <Slide1 bind:visible={visible[0]} />
  </div>
  <div class="section">
    <Slide2 bind:visible={visible[1]} />
  </div>
  <!-- fp-auto-height-responsive -->
  <div class="section fp-auto-height">
    <Slide3 bind:visible={visible[2]} />
  </div>
  <div class="section fp-auto-height">
    <Slide4 />
  </div>
</div>
