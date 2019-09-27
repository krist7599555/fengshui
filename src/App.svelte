<script>
  import { Router, Route, Link } from 'svero'
  import Home from './views/Home.svelte'
  import About from './views/About.svelte'
</script>

<Router>
  <Route path="/about" component={About} />
  <Route path="/" component={Home} exact />
</Router>

<style lang="scss" global>
  @import './main.scss';
</style>
