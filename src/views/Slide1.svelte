<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import Icon from 'fa-svelte'
  import {
    faPhone,
    faPhoneAlt,
    faYinYang,
    faMobile,
    faMobileAlt,
    faPhoneSquare,
    faPhoneSquareAlt,
  } from '@fortawesome/free-solid-svg-icons'
  import {
    faFacebook,
    faLine,
    faFacebookSquare,
  } from '@fortawesome/free-brands-svg-icons'
  export let visible = true
</script>

{#if visible}
  <div id="slide1" class="k-font">
    <a aria-label="call phone" id="abs-contact" href="tel:0847550825">
      <Icon icon={faPhoneAlt} class="fa-1x" />
      <span>084-755-0825</span>
    </a>
    <br />
    <div class="logo" in:fly={{ y: -20, duration: 700, delay: 800 }}>
      <!-- <img src="assets/logo-3.svg" alt="logo" /> -->
      <img src="assets/logo-newAsset1.svg" alt="logo" width="230" />
    </div>
    <div class="body" in:fly={{ y: -20, duration: 1400, delay: 1300 }}>
      <br />
      <img src="assets/banAsset.svg" alt="txt ban" width="300" />
      <br />
      <img
        src="assets/yodAsset.svg"
        alt="txt yod"
        width="230"
        style="margin-top: 0.7rem" />
      <!-- <h1>บ้านกำหนดชีวิต</h1>
      <p>ซินแสฮวงจุ้ย อ.ยศพนธ์ ประดิภาส</p> -->
      <br />
      <!-- <button class="button">อ่านบทความ</button>
      <br /> -->
      <br />
    </div>
    <div
      class="footer"
      style="display: flex; justify-content: center"
      in:fly={{ y: -20, duration: 1400, delay: 2000 }}>
      <a aria-label="facebook link" href="https://facebook.com/bankamnodchivit">
        <Icon icon={faFacebookSquare} class="fa-2x" />
      </a>
      <div style="width: 25px" />
      <a aria-label="line link" href="https://facebook.com/bankamnodchivit">
        <Icon icon={faLine} class="fa-2x" />
      </a>
    </div>
  </div>
{/if}

<style lang="scss">
  #slide1 {
    background-image: linear-gradient(#000d, #111b), url('img/bg1.webp');

    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    background-position: 34%;
    overflow: hidden;
    color: white;
    text-align: center;
    margin: auto auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > .logo {
      margin: 0 auto;
      color: white;
      width: 230px;
    }
    > .body {
      h1 {
        font-size: 3rem;
        margin-bottom: -1rem;
      }
      p {
        font-size: 1.3rem;
      }
    }
    > .footer {
      a {
        color: white;
      }
    }
    > #abs-contact {
      position: absolute;
      top: 25px;
      right: 25px;
      font-weight: lighter;
      color: white;
      text-decoration: none;
      color: #fff4;
      svg + span {
        position: relative;
        top: -3px;
        left: 2px;
      }
    }
  }
  :global(.fa-2x) {
    font-size: 2.5rem;
  }
</style>
