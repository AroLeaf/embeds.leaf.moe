<script>
  export let id;
  let root;

  function close() {
    root.classList.remove('open')
  }
</script>


<div bind:this={root} {id} on:click={close} class="container">
  <div class="modal" on:click={e => e.stopPropagation()}>
    <span class="close" on:click={close}><svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg></span>
    <slot></slot>
  </div>
</div>


<style>
  .container {
    visibility: visible;
    padding: 64px;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #000000da;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .15s, visibility 0s 0s;
  }

  .container:not(.open) {
    opacity: 0;
    visibility: hidden;
    transition: .15s, visibility 0s .15s;
  }

  .modal {
    position: relative;
    background-color: var(--background-primary);
    padding: 16px;
    border-radius: 8px;
    transition: .15s;
  }

  .container:not(.open) .modal {
    transform: scale(.75);
  }

  .close {
    color: var(--interactive-normal);
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    transition: .15s;
  }
  .close:hover {
    color: var(--interactive-hover);
  }

  @media screen and (max-width: 540px) {
    .container {
      padding: 32px;
    }
  }
</style>