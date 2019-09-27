<script>
  let count = 0
</script>

<section class="section">
  <h1>OK title {count}</h1>
  <label on:click|preventDefault={() => (count += 1)}>+</label>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quaerat,
    accusamus inventore tenetur ducimus dolor, voluptas modi nesciunt delectus
    quibusdam dolorum culpa molestiae quos, velit ratione? Quo laborum fuga sed.
  </p>

</section>
