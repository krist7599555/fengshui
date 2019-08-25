<script>
  // import { Router, Route, Link } from "svero";
  import Home from "./views/Home.svelte";
  // import About from "./views/About.svelte";
  // import Blog from "./views/Blog.svelte";
</script>

<style lang="scss" global>
  @import "./main.scss";
</style>

<!-- <nav class="nav -transparent">
  <a href="/" class="item">home</a>
  <a href="/about" class="item">about</a>
  <a href="/blog" class="item">blog</a>
</nav> -->

<Home />
<!-- <Router>
  <Route path="/" component={Home} exact />
  <Route path="/about" component={About} />
  <Route path="/about/:who/123/:where" component={About} />
  <Route path="/blog">
    <Blog />
  </Route>
</Router> -->
