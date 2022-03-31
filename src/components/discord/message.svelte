<script>
  import dayjs from 'dayjs';
  import calendar from 'dayjs/plugin/calendar';

  import Embed from './embed.svelte';

  dayjs.extend(calendar);

  export let message;

  $: content = message.content || '';

  const date = dayjs();
</script>


<div class="message">
  <div class="contents">
    <img src={message.avatar_url||'https://cdn.discordapp.com/embed/avatars/0.png'} alt={message.username||'webhook'} width="40px" height="40px">
    <h2 class="header">
      <span class="name">{message.username||'webhook'}<span class="bot">BOT</span></span>
      <span class="timestamp">{date.calendar(date)}</span>
    </h2>
    <div class="content">{@html content}</div>
  </div>
  <div class="embeds">
    {#each message.embeds||[] as embed }
      <Embed embed={embed}/>
    {/each}
  </div>
</div>


<style>
  .message {
    min-height: 48px;
    position: relative;
    margin-top: 17px;
    padding: 2px 48px 2px 72px;
  }
  .message:hover {
    background-color: var(--background-message-hover);
  }

  img {
    position: absolute;
    left: 16px;
    top: 2px;
    margin-top: 2px;
    border-radius: 50%;
  }

  .header {
    font-size: 16px;
    font-weight: 400;
  }

  .name {
    padding-right: 4px;
    color: var(--header-primary);
  }

  .bot {
    background-color: var(--brand-experiment);
    margin: .75px 0px 0px 4px;
    padding: 0px 4px;
    vertical-align: middle;
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    border-radius: 3px;
  }

  .timestamp {
    padding-left: 4px;
    font-size: 12px;
    color: var(--text-muted);
  }

  .content {
    white-space: pre-line;
  }

  :global(.content pre) {
    white-space: pre-wrap;
    display: block;
    margin-top: 6px;
  }

  :global(.content code) {
    background-color: var(--background-tertiary);
    padding: 2.72px;
    font-size: 14px;
  }

  :global(.content pre code) {
    display: block;
    padding: 7px;
    border-radius: 4px;
    border: 1px solid var(--background-tertiary);
  }

  .embeds {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 4px;
    padding: 2px 0px; 
  }
</style>