<script>
  import { modalData } from './store.js'
  import { fade, fly } from 'svelte/transition'
  import { crossfade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import Icon from 'fa-svelte'
  import {
    faTimes,
    faTimesCircle,
    faArrowLeft,
    faArrowCircleLeft,
    faChevronCircleLeft,
    faChevronLeft,
    faArrowCircleRight,
  } from '@fortawesome/free-solid-svg-icons'
  import * as animateScroll from 'svelte-scrollto'
  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),
  })
  modalData.subscribe(val => {
    if (document.body.classList) {
      if (val) {
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    }
    const elm = document.getElementById('post-content')
    if (elm) {
      elm.scrollTop = 0
    }
  })

  function handleKey(e) {
    switch (e.key) {
      case 'ArrowRight':
        modalData.goNext()
        break
      case 'ArrowLeft':
        modalData.goPrev()
        break
      case 'Escape':
        modalData.reset()
        break
    }
  }
</script>

<svelte:window on:keydown={handleKey} />

<div
  class="modal"
  class:is-active={!!$modalData}
  on:scroll|preventDefault|stopPropagation>
  <div class="background" on:click={() => modalData.reset()} />
  <div id="content-wrapper" style="overflow: auto">
    <div class="nav dark">
      <span on:click|preventDefault={modalData.goPrev}>
        <Icon class="nav-icon -left" icon={faArrowCircleLeft} />
      </span>
      <span on:click|preventDefault={modalData.reset}>
        <Icon class="nav-icon -cancel" icon={faTimesCircle} />
      </span>
      <span on:click|preventDefault={modalData.goNext}>
        <Icon class="nav-icon -right" icon={faArrowCircleRight} />
      </span>
    </div>
    <slot>
      {#if !$modalData}
        FALLBACK NO DATA
      {:else}
        <div
          id="post-content"
          class="content"
          transition:fade={{ duration: 500 }}>

          <div class="post">
            <!-- <h1
              in:send={{ key: 'modal-post-content-head' }}
              out:receive={{ key: 'modal-post-content-head' }}>
              {$modalData.curr.title}
            </h1> -->

            {#if $modalData.img}
              <img src={$modalData.img} alt={$modalData.img} />
            {/if}
            {#if $modalData.html}
              {@html $modalData.html}
            {/if}
            {#if $modalData.imgs}
              {#each $modalData.imgs as img}
                <img src={img} alt={img} />
              {/each}
            {/if}

          </div>

        </div>
        <!-- {:else if $modalData.type == 'img'}
        <img
          style="max-width: 100%; max-height: 100%; z-index: 10; max-width:
          90vw; max-height: 90vh;"
          src={$modalData.curr}
          alt={$modalData.curr} />
      {:else}data.type != post{/if} -->
      {/if}
    </slot>
  </div>

</div>

<style lang="scss">
  .modal.is-active {
    display: flex;
  }
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    align-items: center;
    display: none;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;
    > .background {
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      position: absolute;
      background-color: hsla(0, 0%, 4%, 0.86);
    }
    .content {
      // padding: 3rem 2rem;
      padding: 0;
      @media screen and (min-width: 640px) {
        // padding: 0;
        padding: 3rem 2rem;
      }
      max-height: calc(100vh - 160px);
      overflow: auto;
      position: relative;
      // margin: 0 20px;
      width: 100%;
      max-width: 960px;
      max-width: 500px;
      // @media screen and (max-width: 600px) {
      //   max-width: calc(100vw - 4rem);
      // }
      background-color: white;
      height: 100%;
    }
  }
  .post {
    > :global(img) {
      max-width: 100%;
    }
    > :global(:not(img)) {
      margin-block-end: 2em;
      @media screen and (max-width: 640px) {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
      }
    }
  }
  @media screen and (max-width: 640px) {
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

  #content-wrapper {
    position: relative;
  }
  .nav {
    border-radius: 1rem 1rem 0 0;
    position: sticky;
    display: table-cell;
    &.dark {
      background-color: #404142;
    }
    &:not(.dark) {
      background-color: white;
    }
    border: solid 0px #000;
    border-width: 0 0 1px 0;
    border-width: 0;
    padding: 0.9rem 0rem 3px;
    > * {
      cursor: pointer;
      &:first-child {
        margin-left: 1rem;
      }
      margin-right: 1rem;
    }
    :global(.nav-icon) {
      font-size: 1.3rem;
      &.-left {
        color: #b0b2b7;
      }
      &.-right {
        color: #77b72d;
        // .dark & {
        color: #abdc74;
        // }
      }
      &.-cancel {
        color: #e83060;
        // .dark & {
        color: #e87593;
        // }
      }
    }
  }
</style>
