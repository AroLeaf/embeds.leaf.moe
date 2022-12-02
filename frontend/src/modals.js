import DME from 'discord-markdown-embeds';
import { autoresize } from '@aroleaf/svelte-textarea-autoresize';
import api from './api.js';

const $ = document.querySelector.bind(document);

function registerModal(query) {
  const container = $(query);
  const modal = container.querySelector('.modal');

  const open = () => container.classList.add('open');
  const close = () => container.classList.remove('open');

  container.addEventListener('click', close);
  modal.addEventListener('click', e => e.stopPropagation());

  return {
    open,
    close,
    container,
    modal,
  }
}


function JSONEditor(callback) {
  const modal = registerModal('#json');
  const submit = modal.modal.querySelector('.submit');
  const cancel = modal.modal.querySelector('.cancel');
  const error = modal.modal.querySelector('.error');
  const textarea = modal.modal.querySelector('textarea');

  autoresize(textarea);

  submit.addEventListener('click', () => {
    error.innerText = '';
    const json = textarea.value;
    try {
      callback(DME.reverse(JSON.parse(json)));
      modal.close();
    } catch (e) {
      error.innerText = 'Invalid JSON';
    }
  });

  cancel.addEventListener('click', () => {
    modal.close();
  });

  return {
    open: md => {
      error.innerText = '';
      textarea.value = JSON.stringify(DME.render(md).messages()[0], null, 2);
      textarea.triggerResize();
      modal.open();
    },
    close: modal.close,
  }
}


function saveModal(callback) {
  const modal = registerModal('#save');
  const save = modal.modal.querySelector('.save');
  const cancel = modal.modal.querySelector('.cancel');
  const error = modal.modal.querySelector('.error');
  const input = modal.modal.querySelector('.name');
  const isPublic = modal.modal.querySelector('.public');

  input.addEventListener('input', async () => {
    if (!input.value) return error.innerText = 'Name may not be empty';
    const availability = await api.getAvailable(input.value);
    error.innerText = availability.available || availability.yours ? '' : 'That name is taken';
    save.disabled = availability.available ? false : !availability.yours;
    save.innerText = availability.yours ? 'Overwrite' : 'Save';
  });

  save.addEventListener('click', async () => {
    if (!input.value) return error.innerText = 'Name may not be empty';
    const availability = await api.getAvailable(input.value);
    if (!availability.available && !availability.yours) return error.innerText = 'That name is taken';
    if (await callback(input.value, isPublic.checked, availability.yours)) modal.close();
  });

  cancel.addEventListener('click', () => {
    modal.close();
  });

  return {
    open: () => {
      error.innerText = '';
      save.disabled = false;
      modal.open();
    },
    close: modal.close,
  }
}


export default {
  JSONEditor,
  saveModal,
}