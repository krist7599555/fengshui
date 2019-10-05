<script>
  import { tick, createEventDispatcher, onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { contents, modalData } from './store.js'
  import { crossfade } from 'svelte/transition'
  import _ from 'lodash'

  export let visible = true
  let tab = 'posts'
  const [send, receive] = crossfade({ duration: 1000 })

  import waterfall from '../libs/waterfall'

  async function water() {
    const els = document.querySelector('#slide3-items')
    if (els) {
      waterfall(els)
    } else {
      console.log('sad')
    }
  }

  // $: {
  //   tab
  //   water()
  //   console.log('tab')
  // }
  onMount(async () => {
    // await tick()
    // water()
    setInterval(water, 10)
  })
  // import _$ from 'jquery'
  // _$('#slide3-items').mosaicflow({
  //   // itemSelector: '.item',
  //   minItemWidth: 300,
  // })
</script>

<svelte:window on:resize={water} />

<section id="slide3">
  {#if visible}
    <div class="container">
      <div class="title">
        <span
          class:active={tab == 'showcase'}
          on:click={() => (tab = 'showcase')}>
          ผลงานที่ผ่านมา
        </span>
        <span style="font-size: 2rem; font-weight: lighter">/</span>
        <span class:active={tab == 'posts'} on:click={() => (tab = 'posts')}>
          บทความ
        </span>
        <span style="font-size: 2rem; font-weight: lighter">/</span>
        <span class:active={tab == 'fixed'} on:click={() => (tab = 'fixed')}>
          แนวทางแก้ไข
        </span>
      </div>
      <br />
      <br />
      {#if $contents}
        <div id="slide3-items">
          {#each _.values($contents[tab]) as content}
            <div
              class="card"
              on:click={() => modalData.setContent(content.type, content.num)}>
              <img
                src={content.img}
                alt={content.img}
                loading="lazy"
                width="300"
                height="200" />
              <button class="readmore">อ่านต่อ</button>
            </div>
          {/each}
        </div>
      {/if}
      <br />
      <br />
    </div>
  {/if}
</section>

<style lang="scss">
  #slide3 {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    background-color: white;
    background-size: contain;
    background-position: left bottom;
    background-attachment: inherit;
    background-repeat: no-repeat;
    > .container {
      /* max-width: 968px; */
      /* padding: 0 2rem; */
      margin: 0 auto;
      > .title {
        display: flex;
        justify-content: center;
        vertical-align: middle;
        > * {
          margin: auto 0;
        }
        > :nth-child(2),
        > :nth-child(4) {
          margin: auto 1rem;
        }
        > :not(:nth-child(2)) {
          cursor: pointer;
          padding-bottom: 2px;
          &.active {
            border-bottom: 1px solid #000;
          }
        }
      }
    }
  }
  .gallery,
  .posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    &.-abs {
      position: absolute;
      top: 180px;
      left: 0;
      @media screen and (min-width: 975px) {
        padding: 0 20vh;
      }
    }
  }
  .gallery {
    img {
      // max-height: 200px;
      max-width: 100%;
      /* margin: 0 0.7rem 2rem; */
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
    }
  }

  .card {
    border: solid 2px white;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    background-color: #fff;
    /* box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1); */
    color: #4a4a4a;

    width: 100%;
    @media screen and (min-width: 700px) {
      width: 50%;
    }
    @media screen and (min-width: 900px) {
      width: 33.333%;
    }
    @media screen and (min-width: 1000px) {
      width: 25%;
    }
    position: relative;

    img {
      width: 100%;
      height: auto;
      display: block;
      position: relative;
    }

    .readmore {
      float: right;
      background-color: #4f7b4b;
      border: none;
      color: white;
      padding: 0.3rem 1rem;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      border: solid 1px #fff;
      border-width: 0 0 0.5px 0.5px;
    }
  }

  #slide3-items {
    width: 100vw;
  }
</style>
