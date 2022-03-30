<script>
  import Field from './field.svelte';

  export let embed;

  function chunks(fields) {
    const rows = [];
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].inline) {
        rows.push(fields[i]);
      } else {
        rows.push([]);
        while (fields[i]?.inline && rows.at(-1).length < 3) {
          rows.at(-1).push(fields[i++]);
        }
        i--;
      }
    }
    return rows;
  }
</script>


<div class="fields">
  {#each chunks(embed.fields) as fields }
    {#if Array.isArray(fields)}
      {#each fields as field, i }
        <Field field={field} start={12/fields.length*i+1} end={12/fields.length*(i+1)+1}/>
      {/each}
    {:else}
      <Field field={fields} start="1" end="13"/>
    {/if}
  {/each}
</div>


<style>
  .fields {
    margin-top: 8px;
    display: grid;
    gap: 8px;
  }
</style>