<script>
  import { tick, getContext, createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import _ from 'lodash'
</script>

<section id="slide4">
  <p>อ. ยศพนธ์ ประดิภาส</p>
  <img src="assets/logo.svg" alt="logo" />
  <a aria-label="call phone" href="tel:0847550825">084-755-0825</a>

</section>

<style lang="scss">
  #slide4 {
    background-color: #181f27;
    margin: 0;
    height: 80px;
    text-align: center;
    margin: auto;
    display: flex;
    color: white;
    justify-content: center;
    img {
      filter: brightness(10);
      height: 35px;
      margin: auto 2rem;
    }
    a,
    p {
      margin: auto 0;
      color: white;
      text-decoration: none;
      font-weight: lighter;
    }
  }
</style>
