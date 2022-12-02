<script>
  import dayjs from 'dayjs';
  import calendar from 'dayjs/plugin/calendar';

  dayjs.extend(calendar);

  export let embed;

  $: text = embed.footer?.text || '';
</script>


<div class="footer">
  {#if embed.footer?.icon_url}
    <img src={embed.footer.icon_url} alt="">
  {/if}
  {text}
  {#if text && embed.timestamp}•{/if}
  {#if embed.timestamp}
    {dayjs(embed.timestamp).calendar(dayjs())}
  {/if}
</div>


<style>
  .footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    margin-top: 8px;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }
</style>