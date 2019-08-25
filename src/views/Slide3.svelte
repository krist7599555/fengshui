<script>
  import { tick, getContext, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import _ from "lodash";
  export let visible = true;
</script>

<style lang="scss">
  #slide3 {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    background-image: url("img/henry-co-6-stO-K6JaY-unsplash.webp");
    background-size: contain;
    background-position: left bottom;
    background-attachment: inherit;
    background-repeat: no-repeat;
    > .container {
      margin: 0 auto;
      margin-right: 0;
      margin-left: 27vw;

      > .title {
        h1 {
          font-size: 2rem;
        }
        p {
        }
      }
      > .gallery {
        img {
          max-height: 200px;
          margin: 10px;
          box-shadow: 2px 4px 3px 0px #17292c26, 6px 18px 9px 0px #29272710;
        }
        max-height: 70vh;
        overflow: auto;
      }
    }
  }
</style>

{#if visible}
  <section id="slide3">
    <div class="container">
      <div class="title" in:fly={{ x: -20, duration: 1000, delay: 700 }}>
        <h1>ผลงานที่ผ่านมา</h1>
      </div>
      <br />
      <div class="gallery">
        {#each _.range(1, 13) as num}
          <img
            src={`showcase/${num}.webp`}
            alt={'show case ' + num}
            in:fly={{ y: -20, duration: 1000, delay: num * 100 + 700 }} />
        {/each}
      </div>
      <br />
      <br />
    </div>
  </section>
{/if}
