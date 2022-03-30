<script>
  import DME from 'discord-markdown-embeds';
  import { send, edit } from '../api.js';
  export let messages;
  
  let md = '';

  let webhook = '';
  let thread = '';
  let message = '';
  let error;

  $: (() => {
    try {
      $messages = DME.render(md, { html: true }).messages();
    } catch (err) {}
  })();

  async function submit() {
    const res = message
      ? await edit(webhook, DME.render(md).messages()[0], /(\d+)\/?$/.exec(message)?.[1], /(\d+)\/?$/.exec(thread)?.[1])
      : await send(webhook, DME.render(md).messages()[0], /(\d+)\/?$/.exec(thread)?.[1]);
    if (res instanceof Error) error = res.message;
  }
</script>


<div class="inputs">
  <div class="row" style="grid-column: 1 / 3;">
    <label>
      <h4>Webhook URL</h4>
      <input type="password" bind:value={webhook}>
    </label>
    <button disabled={!webhook} on:click={submit}>{message?'Edit':'Send'}</button>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </div>

  <label>
    <h4>Thread ID or URL</h4>
    <input type="text" bind:value={thread}>
  </label>
  <label>
    <h4>Message ID or URL</h4>
    <input type="text" bind:value={message}>
  </label>


  <label style="grid-column: 1 / 3;">
    <h4>Markdown</h4>
    <textarea bind:value={md}></textarea>
  </label>
</div>


<style>
  .inputs {
    display: grid;
    grid-template-rows: repeat(2, auto) 1fr;
    margin-top: -32px;
    gap: 8px;
  }

  label {
    margin-top: 8px;
    width: 100%;
    display: block;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: end;
  }

  .error {
    color: tomato;
  }

  input, textarea {
    position: relative;
    background-color: var(--background-primary);
    display: block;
    width: 100%;
		padding: 8px;
    box-sizing: border-box;
		border-radius: 8px;
		border: none;
		outline: none;
    font-size: 16px;
		color: var(--text-normal);
  }

  input:disabled {
    color: var(--text-muted);
    cursor: not-allowed;
  }

  button {
    background-color: var(--brand-experiment);
    width: fit-content;
    height: 38px;
    padding: 2px 16px;
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
    transition: .17s;
  }
  button:hover {
    background-color: var(--brand-experiment-560);
  }
  button:active {
    background-color: var(--brand-experiment-600);
  }

  button:disabled {
    background-color: var(--brand-experiment-600);
    color: var(--text-normal);
    cursor: not-allowed;
  }

  textarea {
		resize: none;
    height: calc(100% - 24px);
	}
</style>