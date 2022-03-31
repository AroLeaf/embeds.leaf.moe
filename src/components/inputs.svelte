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
    } catch (err) {
      console.log(err);
    }
  })();

  async function submit() {
    const res = message
      ? await edit(webhook, DME.render(md).messages()[0], /(\d+)\/?$/.exec(message)?.[1], /(\d+)\/?$/.exec(thread)?.[1])
      : await send(webhook, DME.render(md).messages()[0], /(\d+)\/?$/.exec(thread)?.[1]);
    if (res instanceof Error) error = res.message;
  }

  function help() {
    document.getElementById('help-modal').classList.add('open');
  }

  function tab(e) {
    if (e.keyCode !== 9) return;
    e.preventDefault();
    const value = e.target.value;
    const pos = { s: e.target.selectionStart, e: e.target.selectionEnd };
    const add = /(?<![^\n])(..)*.$/.test(value.slice(0, pos.s)) ? ' ' : '  ';
    e.target.value = value.slice(0, pos.s) + add + value.slice(pos.e)
    e.target.selectionStart = e.target.selectionEnd = pos.s + (pos.s == pos.e ? 2 : add.length);
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
    <h4>Markdown <span class="help" on:click={help}><svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 336c-18 0-32 14-32 32s13.1 32 32 32c17.1 0 32-14 32-32S273.1 336 256 336zM289.1 128h-51.1C199 128 168 159 168 198c0 13 11 24 24 24s24-11 24-24C216 186 225.1 176 237.1 176h51.1C301.1 176 312 186 312 198c0 8-4 14.1-11 18.1L244 251C236 256 232 264 232 272V288c0 13 11 24 24 24S280 301 280 288V286l45.1-28c21-13 34-36 34-60C360 159 329 128 289.1 128z"/></svg></span></h4>
    <textarea bind:value={md} on:keydown={tab}></textarea>
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

  .help {
    cursor: pointer;
    vertical-align: -4px;
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
    height: calc(100% - 28px);
    margin: 0px;
	}
</style>