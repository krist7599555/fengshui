<script>
  import { fullpage, licenseKey } from '../libs/fullpage.js'
  import { tick, onMount } from 'svelte'
  import About from './About.svelte'

  let visible = [true, true, true, true]
  // $: console.log(visible);
  async function reload(index) {
    visible[index] = false
    await tick()
    visible[index] = true
  }
  let fullpage_api = null
  onMount(async () => {
    fullpage_api = new fullpage('#fullpage', {
      // css3: false,
      // scrollBar: true,
      scrollOverflow: true,
      licenseKey: licenseKey,
      async onLeave(ol, nw) {
        if (ol.index == 3 && nw.index == 2) return
        await reload(nw.index)
      },
    })
    // fullpage_api.setResponsive(true);
    // fullpage_api.moveTo(2);
    await tick()
    await reload(0)
  })
  import Slide1 from './Slide1.svelte'
  import Slide2 from './Slide2.svelte'
  import Slide3 from './Slide3.svelte'
  import Slide4 from './Slide4.svelte'

  async function changeHandle() {
    setTimeout(fullpage_api.reBuild, 500)
  }

  import Modal from './Modal.svelte'
</script>

<div id="fullpage">

  <!-- <div class="section fp-auto-height-responsive fp-scrollable">
    <About />
  </div> -->
  <div class="section">
    <!-- <About /> -->
    <Slide1 bind:visible={visible[0]} />
  </div>
  <div class="section">
    <Slide2 bind:visible={visible[1]} />
  </div>
  <!-- fp-auto-height-responsive -->
  <div class="section fp-auto-height-responsive fp-scrollable">
    <!-- <div> -->
    <Slide3 bind:visible={visible[2]} />
    <!-- <Slide4 /> -->
    <!-- </div> -->
  </div>
  <!-- <div class="section fp-auto-height">
  </div> -->
</div>

<Modal />
