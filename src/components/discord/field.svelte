<script>
  export let field;
  export let start;
  export let end;
</script>


<div class="field" style="grid-column: {start} / {end};">
  <div class="name">{@html field.name}</div>
  <div class="value">{@html field.value}</div>
</div>


<style>
  .field {
    font-size: 14px;
  }

  .name {
    margin-bottom: 2px;
    font-weight: 600;
    color: var(--header-primary);
  }

  .value {
    white-space: pre-line;
    min-width: 0;
  }

  :global(pre) {
    white-space: pre-wrap;
    display: block;
    margin-top: 6px;
  }

  :global(code) {
    background-color: var(--background-tertiary);
    padding: 2.72px;
    font-size: 14px;
  }

  :global(pre code) {
    display: block;
    padding: 7px;
    border-radius: 4px;
  }
</style>