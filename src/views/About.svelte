<script>
  import { crossfade, slide, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  const unset = { id: null };
  let selectedLocation = unset;

  let locations = [
    { name: "Cool Location", id: 1 },
    { name: "Cool Location2", id: 2 }
  ];

  const duration = 600;

  const fallback = false // toggle this to compare slide v scale
    ? node => slide(node, { duration })
    : node => scale(node, { duration });

  const [send, receive] = crossfade({
    duration,
    fallback
  });

  $: visibleLocations = selectedLocation.id ? [] : locations;
</script>

<style>
  .location-list {
    max-width: 30em;
    width: 100%;
    margin: 0 auto;
    border: 1px solid gray;
  }

  .location:hover {
    background: lightgray;
    cursor: pointer;
  }
  .header {
    position: relative;
    color: white;
    background-color: blue;
    padding: 0.5rem 0.5rem 0.5rem 3rem;
  }
  .location {
    position: relative;
    padding: 0.5rem 0.5rem 0.5rem 3rem;
  }
  button {
    position: absolute;
    display: inline;
    height: 1em;
    left: 0.5rem;
    margin: 0;
    line-height: 0;
    box-sizing: border-box;
  }
</style>

<div class="location-list">
  {#each [selectedLocation] as location (location.id)}
    <div
      class="header"
      in:receive={{ key: location.id }}
      out:send={{ key: location.id }}>
      {#if location.id}
        <button on:click={() => (selectedLocation = unset)}>◀️</button>
        {location.name}
      {:else}Pick a Location near you{/if}
    </div>
  {/each}

  {#each visibleLocations as location (location.id)}
    <div
      on:click={() => (selectedLocation = location)}
      class="location"
      in:receive={{ key: location.id }}
      out:send={{ key: location.id }}>
      <div class="name">{location.name}</div>
    </div>
  {/each}
</div>
