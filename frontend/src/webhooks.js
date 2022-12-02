export async function send(webhook, data, thread) {
  const err = isInvalid(data);
  if (err) return err;
  
  const body = new FormData();
  body.append('payload_json', JSON.stringify(data));
  
  const res = await fetch(`${webhook}?wait=true${thread?'&thread_id='+thread:''}`, {
    method: 'POST',
    body,
  });
  return res.ok ? res.json() : error(res.status);
}



export async function edit(webhook, data, message, thread) {
  const err = isInvalid(data);
  if (err) return err;
  
  const body = new FormData();
  body.append('payload_json', JSON.stringify(data));
  
  const res = await fetch(`${webhook}/messages/${message}${thread?'?thread_id='+thread:''}`, {
    method: 'PATCH',
    body,
  });
  return res.ok ? res.json() : error(res.status);
}



function isInvalid(data) {
  if (data.embeds?.length) {
    for (const embed of data.embeds) {
      if (embed.fields?.length) {
        for (const field of embed.fields) {
          if (!field.name || !field.value) return error('Fields need both a title and body');
        }
      } else {
        if (!(
          embed.title ||
          embed.description ||
          embed.image?.url ||
          embed.author?.name ||
          embed.footer?.text
        )) return error('Embeds need a title, description, image, author, or footer');
      }
    }
  } else if (!data.content) {
    return error('Messages need content or embeds');
  }
}



function error(err) {
  err = err.toString();
  return new Error(({
    400: 'The supplied thread ID, or the message data is invalid.',
    401: 'The supplied webhook url is invalid.',
    403: 'The supplied webhook url may not do that.',
    404: 'The supplied webhook url or message ID is invalid.',
    429: 'You\'re being ratelimited.',
  })[err] || err);
}

export default {
  send, edit,
}