<script>
  export let embed;
</script>


<img src={embed.thumbnail.url} alt={embed.thumbnail.url}>


<style>
  img {
    border-radius: 3px;
    max-width: 80px;
    max-height: 80px;
    margin: 8px 0px 0px 16px;
    grid-row: 1/8;
    grid-column: 2/3;
  }
</style>