import Chat from './components/discord/chat.svelte';
import DME from 'discord-markdown-embeds';
import { autoresize } from '@aroleaf/svelte-textarea-autoresize';

import modals from './modals.js';
import api from './api.js';
import webhooks from './webhooks.js';

const $ = document.querySelector.bind(document);

const chat = new Chat({
  props: { messages: [{}] },
  target: $('#embeds'),
});
const updateMessages = messages => chat.$set({ messages });

const loginButton = $('#login');
const logoutLink = $('#logout');

const inputsError = $('.inputs .error'); 
const webhookInput = $('#webhook');
const submitButton = $('#submit');
const threadNameInput = $('#threadname');
const threadUrlInput = $('#threadurl');
const messageUrlInput = $('#messageurl');
const markdownArea = $('#markdown');
const JSONEditorButton = $('#editjson');
const saveButton = $('#savebutton');
const saveAsButton = $('#saveasbutton');


const JSONModal = modals.JSONEditor(md => {
  markdownArea.value = md;
  updateMessages(DME.renderHTML(md).messages());
  markdownArea.triggerResize();
});

const saveModal = modals.saveModal(async (name, isPublic, isOverwrite) => {
  const request = isOverwrite 
    ? api.edit(name, { markdown: markdownArea.value, public: isPublic })
    : api.saveAs(name, markdownArea.value, isPublic);
  return request.then(() => {
    saveAsButton.classList.remove('hidden');
    window.history.pushState({}, null, `/${encodeURIComponent(name)}`);
    return true;
  }).catch(() => {});
});


loginButton?.addEventListener('click', () => {
  window.localStorage.setItem('markdown', markdownArea.value);
  window.location.assign('/api/auth');
});

logoutLink?.addEventListener('click', () => {
  window.localStorage.setItem('markdown', markdownArea.value);
})

webhookInput.addEventListener('input', () => {
  submitButton.disabled = !webhookInput.value;
});

threadNameInput.addEventListener('input', () => {
  threadUrlInput.disabled = messageUrlInput.disabled = !!threadNameInput.value;
});

threadUrlInput.addEventListener('input', () => {
  threadNameInput.disabled = !!(threadUrlInput.value || messageUrlInput.value);
});

messageUrlInput.addEventListener('input', () => {
  threadNameInput.disabled = !!(threadUrlInput.value || messageUrlInput.value);
  submitButton.innerText = messageUrlInput.value ? 'Edit' : 'Send';
});

markdownArea.addEventListener('input', () => {
  updateMessages(DME.renderHTML(markdownArea.value).messages());
});

JSONEditorButton.addEventListener('click', () => {
  JSONModal.open(markdownArea.value);
});

saveButton?.addEventListener('click', async () => {
  const name = window.location.pathname.slice(1);
  if (!name || saveAsButton.classList.contains('hidden')) return saveModal.open();
  
  saveButton.classList.remove('green');
  saveButton.classList.remove('error');
  
  await api.save(name, markdownArea.value).then(res => {
    saveButton.classList.add(res.ok ? 'green' : 'error');
  }).catch(() => {
    saveButton.classList.add('error');
  });
});

saveAsButton?.addEventListener('click', () => {
  saveModal.open();
});

submitButton.addEventListener('click', async () => {
  submitButton.classList.remove('green');
  inputsError.innerText = '';
  const res = messageUrlInput.value
    ? await webhooks.edit(webhookInput.value, DME.render(markdownArea.value).messages()[0], /(\d+)\/?$/.exec(messageUrlInput.value)?.[1], /(\d+)\/?$/.exec(threadUrlInput.value)?.[1])
    : await webhooks.send(webhookInput.value, Object.assign(DME.render(markdownArea.value).messages()[0], { thread_name: threadNameInput.value }), /(\d+)\/?$/.exec(threadUrlInput.value)?.[1]);
  if (res instanceof Error) {
    submitButton.classList.add('error');
    return inputsError.innerText = res.message;
  }
  submitButton.classList.add('green');
});


autoresize(markdownArea);

const saved = window.localStorage.getItem('markdown');
if (saved) {
  markdownArea.value = saved;
  window.localStorage.removeItem('markdown');
}

updateMessages(DME.renderHTML(markdownArea.value).messages());
markdownArea.triggerResize();