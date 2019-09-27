<script>
  import About from './About.svelte'
  import { modalData } from './store.js'
  import Slide1 from './Slide1.svelte'
  import Slide2 from './Slide2.svelte'
  import Slide3 from './Slide3.svelte'
  import Slide4 from './Slide4.svelte'
  import Modal from './Modal.svelte'

  import { tick, onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import _ from 'lodash'

  function allowScroll(allow) {
    document.body.classList[allow ? 'remove' : 'add']('stop-scrolling')
  }

  function getScrollTop() {
    var doc = document.documentElement
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
  }
  function getFullHeight() {
    return window.innerHeight
  }

  onMount(() => {
    allowScroll(false)
  })
  let isScrolling = false
  let showSlide2 = false

  function wheel(e) {
    const down = e.deltaY > 0
    if (getScrollTop() >= getFullHeight() * 2 + 10) return
    if (!isScrolling) {
      allowScroll(false)
      isScrolling = true
      document.body.style.transform = `translateY(${
        down ? '-100vh' : _.min([getFullHeight(), getScrollTop()]) + 'px'
      })`
      if (down) {
        showSlide2 = true
      }
      setTimeout(async () => {
        allowScroll(true)
        document.body.style.transform = ''
        const locY = getScrollTop() + (down ? 1 : -1) * getFullHeight()
        window.scrollTo(0, locY)
        isScrolling = false
        allowScroll(false)
        await tick()
        console.log(getScrollTop(), 2 * getFullHeight())
        if (down && getScrollTop() >= 2 * getFullHeight() - 10) {
          isScrolling = true
          allowScroll(true)
        }
      }, 1550)
    }
  }
</script>

<!-- <svelte:window on:scroll|preventDefault={scroll} on:touchmove|preventDefault /> -->
<svelte:body on:wheel={wheel} on:touchmove={wheel} />
<!-- <div style='position: fixed; z-index: 1000; color: red
'>
  {$screen} {$screen % window.innerHeight}
</div> -->

<div id="fullpage">
  <div class="section">
    <Slide1 />
  </div>
  <div class="section">
    {#if showSlide2}
      <Slide2 />
    {/if}
  </div>
  <div class="section fp-auto-height-responsive fp-scrollable">
    <Slide3 />
  </div>
  <Slide4 />
</div>

<Modal />


<style>
  .section > :global(*) {
    min-height: 100vh;
  }
  :global(body.stop-scrolling) {
    height: 100%;
    overflow: hidden;
    transition: transform 1s ease;
  }
</style>
