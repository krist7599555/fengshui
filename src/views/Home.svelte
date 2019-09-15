<script>
  import About from "./About.svelte";
  import { modalData } from "./store.js";
  import Slide1 from "./Slide1.svelte";
  import Slide2 from "./Slide2.svelte";
  import Slide3 from "./Slide3.svelte";
  import Slide4 from "./Slide4.svelte";
  import Modal from "./Modal.svelte";

  import { tick, onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import _ from "lodash";

  const screen = tweened(0, {
    duration: 1000,
    easing: cubicInOut
  });
  $: window.scrollTo(0, $screen);

  function getScrollTop() {
    var doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  let isScrolling = false;
  async function scroll(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!isScrolling && !$modalData) {
      console.log("start Scroll");
      isScrolling = true;
      const screenHeight = window.innerHeight;
      const scrollTop = getScrollTop();
      const currSection = _.round(scrollTop / screenHeight);

      if (scrollTop > $screen && currSection < 2) {
        screen.set((currSection + 1) * screenHeight);
        document.body.classList.add("stop-scrolling");
      } else if (scrollTop < $screen && currSection < 3) {
        screen.set((currSection - 1) * screenHeight);
        document.body.classList.add("stop-scrolling");
      } else {
        isScrolling = false;
        return;
      }
      clearTimeout(scrollId);
      var scrollId = setTimeout(function() {
        isScrolling = false;
        document.body.classList.remove("stop-scrolling");
      }, 1566);
    }
    // await tick();
    // yOffset = scrollTop;
    // const rect = document.body.getBoundingClientRect()
    // console.log(scrollTop, rect)
    // if (scrollTop > 1000) {
    //   window.scroll(0, 100)
    // }
    // window.pageYOffset = window.pageYOffset % 1000

    // console.log(e)
    // console.log(document.body.getBoundingClientRect())
    // console.log(document.body)
    // console.log(document.body.scrollTop)
    // console.log(document.body.scrollTop)

    // ).top > scrollPos
  }
</script>

<style>
  .section > :global(*) {
    min-height: 100vh;
  }
  :global(.stop-scrolling) {
    height: 100%;
    overflow: hidden;
  }
</style>

<svelte:window on:scroll|preventDefault={scroll} on:touchmove|preventDefault />

<!-- <div style='position: fixed; z-index: 1000; color: red
'>
  {$screen} {$screen % window.innerHeight}
</div> -->

<div id="fullpage">
  <!-- <div class="section">
    <Slide1 />
  </div>
  <div class="section">
    <Slide2 />
  </div> -->
  <div class="section fp-auto-height-responsive fp-scrollable">
    <Slide3 />
  </div>
</div>

<Modal />
