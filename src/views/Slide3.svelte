<script>
  import { tick, createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { posts, modalData } from "./store.js";
  import { crossfade } from "svelte/transition";
  import _ from "lodash";

  export let visible = true;

  let tab = "posts";
  const [send, receive] = crossfade({ duration: 1000 });
  const dispatch = createEventDispatcher();

  async function setTab(str) {
    tab = str;
    dispatch("change", { loc: "tab" });
  }
</script>

<style lang="scss">
  #slide3 {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    background-color: white;
    // background-image: url("img/henry-co-6-stO-K6JaY-unsplash.webp");
    background-size: contain;
    background-position: left bottom;
    background-attachment: inherit;
    background-repeat: no-repeat;
    > .container {
      max-width: 968px;
      padding: 0 2rem;
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
      max-height: 200px;
      max-width: 100%;
      margin: 0 0.7rem 2rem;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
    }
  }

  .card {
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.03);
    }
    cursor: pointer;
    height: fit-content;
    margin: 0 0.7rem 2rem;
    background-color: #fff;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    max-width: 100%;
    max-width: 300px;
    position: relative;
    > .image {
      display: block;
      position: relative;
      img {
        max-height: 200px;
        max-width: 300px;
        width: 100%;
        height: auto;
      }
    }
    > .content {
      background-color: transparent;
      padding: 1rem 1rem;
      overflow: hidden;
      text-overflow: clip;
      white-space: nowrap;
      p {
        margin: 0;
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
  }
</style>

<section id="slide3">
  {#if visible}
    <div class="container">
      <div class="title">
        <span
          on:click={() => setTab('gallery')}
          class:active={tab == 'gallery'}>
          ผลงานที่ผ่านมา
        </span>
        <span style="font-size: 2rem; font-weight: lighter">/</span>
        <span on:click={() => setTab('posts')} class:active={tab != 'gallery'}>
          บทความ
        </span>
        <span style="font-size: 2rem; font-weight: lighter">/</span>
        <span on:click={() => setTab('posts')} class:active={tab != 'gallery'}>
          แนวทางแก้ไข
        </span>
      </div>
      <br />
      <br />
      {#if tab == 'gallery'}
        <div
          class="gallery"
          class:active={tab == 'gallery'}
          in:fly={{ x: -window.innerWidth, delay: 300 }}
          out:fly={{ x: -window.innerWidth }}>
          {#each _.range(0, 12) as num (num)}
            <img
              on:click={() => modalData.setImage(num)}
              src={`showcase/${num + 1}.webp`}
              alt={'show case ' + num + 1} />
          {/each}
        </div>
      {:else}
        <div
          class="posts"
          class:active={tab != 'gallery'}
          in:fly={{ x: window.innerWidth, delay: 300 }}
          out:fly={{ x: window.innerWidth }}>
          {#each $posts as post, num (num)}
            <div class="card" on:click={() => modalData.setPost(num)}>
              <div class="image">
                <img src={post.image} alt={post.image} />
              </div>
              <div class="content">
                <p>{post.title}</p>
                <button class="readmore">อ่านต่อ</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
      <br />
      <br />
    </div>
  {/if}
</section>
