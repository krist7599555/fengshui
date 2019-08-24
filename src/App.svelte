<script>
  import { Router, Route, Link } from "svero";
  import Home from "./views/Home.svelte";
  import About from "./views/About.svelte";
  import Blog from "./views/Blog.svelte";
</script>

<style>
  .nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #363636;
    height: 30px;
  }
  .nav > .item {
    color: white;
    margin: auto auto;
  }
</style>

<nav class="nav">
  <a href="/" class="item">home</a>
  <a href="/about" class="item">about</a>
  <a href="/blog" class="item">blog</a>
</nav>
<Router>
  <Route path="/" component={Home} exact />
  <Route path="/about" component={About} />
  <Route path="/about/:who/123/:where" component={About} />
  <Route path="/blog">
    <Blog />
  </Route>
</Router>
