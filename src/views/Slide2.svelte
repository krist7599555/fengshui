<script>
  import { tick, getContext, createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  export let visible = true
</script>

{#if visible}
  <section id="slide2" class="k-font">
    <div class="profile" in:fly={{ y: 20, duration: 2400, delay: 500 }}>
      <img load="eager" src="img/yotpone.webp" alt="people yotpone" />
    </div>
    <div class="quote" in:fly={{ y: -20, duration: 2400, delay: 700 }}>
      ความยากดีมีจน ความสุขความทุกข์
      <br />
      มีผลกำเนิดจากบ้านที่เราอยู่
      <br />
      มีนคือความลับที่หลายคนไม่เคยรู้ และคิดไม่ถึง
    </div>
  </section>
{/if}

<style lang="scss">
  #slide2 {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    max-width: 950px;
    margin: auto auto;
    height: 100vh;
    height: -webkit-fill-available;

    > .profile {
      margin-right: 3rem;
      flex: 1;
      $size: 300px;
      width: $size;
      height: $size;
      // border-radius: 50%;
      overflow: hidden;
      margin: auto auto;
      img {
        height: $size;
      }
    }

    > .quote {
      flex: 1;
      font-size: 1.2rem;
      position: relative;
      margin: auto auto;
      max-width: 400px;
      // padding-right: 2rem;
      text-align: center;
      &::before,
      &::after {
        content: '"';
        color: #36363626;
        line-height: 0;
        font-size: 20rem;
        position: absolute;
      }
      &::before {
        top: 0;
        left: -4rem;
      }
      &::after {
        bottom: -9rem;
        right: -5rem;
      }
    }

    @media screen and (max-width: 897px) {
      flex-direction: column;
      > .profile {
        flex: unset;
        margin-bottom: 3rem;
      }
      > .quote {
        flex: unset;
        padding: 0;
        margin-top: 3rem;
        // margin-left: 1rem;
        // margin-right: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        @media screen and (max-width: 450px) {
          max-width: 300px;
          margin-top: 0rem;
        }
        &::before,
        &::after {
          content: '';
        }
      }
    }
  }
</style>
