<script>
  import { modalData } from "./store.js";
  import { fade, fly } from "svelte/transition";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Icon from "fa-svelte";
  import * as animateScroll from "svelte-scrollto";
  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200)
  });
  modalData.subscribe(val => {
    const elm = document.getElementById("post-content");
    if (elm) {
      elm.scrollTop = 0;
    }
  });

  function handleKey(e) {
    switch (e.key) {
      case "ArrowRight":
        modalData.goNext();
        break;
      case "ArrowLeft":
        modalData.goPrev();
        break;
      case "Escape":
        modalData.reset();
        break;
    }
  }
</script>

<style lang="scss">
  %fit-full {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .modal.is-active {
    display: flex;
  }
  .modal {
    position: fixed;
    @extend %fit-full;
    align-items: center;
    display: none;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;
    > .background {
      @extend %fit-full;
      background-color: hsla(0, 0%, 4%, 0.86);
    }
    .content {
      padding: 3rem 2rem;
      @media screen and (min-width: 600px) {
        max-height: calc(100vh - 160px);
      }
      overflow: auto;
      position: relative;
      // margin: 0 20px;
      width: 100%;
      max-width: 960px;
      max-width: 600px;
      background-color: white;
      height: 100%;
    }
  }
  .post {
    > :global(img) {
      max-width: 100%;
    }
    @media screen and (max-width: 600px) {
      > :global(:not(img)) {
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .footer {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .button {
    background-color: #fff;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    padding-bottom: calc(0.375em - 1px);
    padding-left: 0.75em;
    padding-right: 0.75em;
    padding-top: calc(0.375em - 1px);
    text-align: center;
    white-space: nowrap;
    border: solid 1px #dbdbdb;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .prev-area,
  .next-area {
    width: 20%;
    background-color: #0005;
    position: absolute;
    height: 100%;
    top: 0;
    cursor: pointer;
    &::before {
      text-align: center;
      width: 100%;
      position: absolute;
      top: 29%;
      color: white;
      font-size: 1.5rem;
    }
    transition-delay: 1s;
    animation-duration: 1s;
    animation-fill-mode: both;
    transition: all 1s ease-out;
    &:not(:hover) {
      animation-name: fadeOut;
      // opacity: 1;
    }
  }
  .prev-area {
    left: 0;
    &::before {
      content: "ก่อนหน้า";
    }
  }
  .next-area {
    right: 0;
    &::before {
      content: "ต่อไป";
    }
  }
  #content-wrapper {
    position: relative;
  }
</style>

<svelte:window on:keydown={handleKey} />
<div class="modal" class:is-active={!!$modalData}>
  <div class="background" on:click={() => modalData.reset()} />
  <div id="content-wrapper">
    <slot>
      {#if !$modalData}
        FALLBACK NO DATA
      {:else if $modalData.type == 'post'}
        <div
          id="post-content"
          class="content"
          transition:fade={{ duration: 500 }}>
          <div class="body">
            <div class="post">
              <h1
                in:send={{ key: 'modal-post-content-head' }}
                out:receive={{ key: 'modal-post-content-head' }}>
                {$modalData.curr.title}
              </h1>
              <img src={$modalData.curr.image} alt={$modalData.curr.title} />
              {@html $modalData.curr.html}
            </div>
          </div>
        </div>
      {:else if $modalData.type == 'img'}
        <img
          style="max-width: 100%; max-height: 100%; z-index: 10; max-width:
          90vw; max-height: 90vh;"
          src={$modalData.curr}
          alt={$modalData.curr} />
      {:else}data.type != post{/if}
      <div class="prev-area" on:click={modalData.goPrev} />
      <div class="next-area" on:click={modalData.goNext} />
    </slot>
  </div>
  <!-- <div class="footer">
    <a class="button" on:click={modalData.goPrev}>ก่อนหน้า</a>
    <a class="button" on:click={modalData.reset}>ปิด</a>
    <a class="button" on:click={modalData.goNext}>ต่อไป</a>
  </div> -->
</div>
