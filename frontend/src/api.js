async function getAvailable(name) {
  return fetch(`/api/docs/${encodeURIComponent(name)}/available`).then(res => res.ok && res.json());
}

async function save(name, markdown) {
  return fetch(`/api/docs/${encodeURIComponent(name)}/markdown.md`, {
    method: 'PUT',
    body: markdown,
  });
}

async function saveAs(name, markdown, isPublic = false) {
  return fetch('/api/docs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, markdown, public: isPublic }),
  });
}

async function edit(name, options) {
  return fetch(`/api/docs/${encodeURIComponent(name)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  })
}

export default {
  getAvailable,
  save, saveAs,
  edit,
}