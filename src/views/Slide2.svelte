<script>
  import { tick, getContext, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  export let visible = true;
</script>

<style lang="scss">
  #slide2 {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    max-width: 950px;
    margin: auto auto;
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
      flex: 2;
      font-size: 1.2rem;
      position: relative;
      margin: auto auto;
      max-width: 400px;

      &::before,
      &::after {
        content: '"';
        color: #36363633;
        line-height: 0;
        font-size: 25rem;
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
  }
</style>

{#if visible}
  <section id="slide2">
    <div class="profile" in:fly={{ y: 20, duration: 2400, delay: 500 }}>
      <img
        src="img/69340853_109203763782390_221042970084769792_o.webp"
        alt="people" />
    </div>
    <div class="quote" in:fly={{ y: -20, duration: 2400, delay: 700 }}>
      เมื่อผมสามารถรู้ความเป็นไปของชีวิตคนในบ้านได้
      <br />
      รู้คุณสมบัติของบ้านที่ส่งผลกระทบกับคนอยู่อาศัยได้
      <br />
      ผมก็ควรต้องรู้วิธีแก้ไขชีวิตคนในบ้านให้ได้ด้วย
    </div>
  </section>
{/if}
