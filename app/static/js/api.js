function get(url) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'GET',
  })
    .then(res => res.json())
}

function post(url, data) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}

function del(url, data) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'DELETE',
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}

class API {
  clip(sourceId, clipName, points) {
    return post('/clip', {
      source_id: sourceId,
      clip_name: clipName,
      points: points
    });
  }

  updateClip(sourceId, clipId, clipName, points) {
    return post('/clip', {
      clip_id: clipId,
      source_id: sourceId,
      clip_name: clipName,
      points,
    });
  }

  saveSource(srcUrl, imgUrl, attribution, tags) {
    return post('/sources', {
      src_url: srcUrl,
      img_url:  imgUrl,
      tags: tags,
      attribution: attribution,
    });
  }

  getPack() {
    return get('/pack');
  }

  createPack(packName, maxSide) {
    return post('/pack', {
      pack_name: packName,
      max_side: maxSide
    });
  }

  addToPack(clipId) {
    return post('/pack/edit', {
      clip_id: clipId
    });
  }

  remFromPack(clipId) {
    return del('/pack/edit', {
      clip_id: clipId
    });
  }

  resetPack() {
    return post('/pack/edit', {
      reset: true
    });
  }

  updateSource(sourceId, data) {
    return post(`/edit/${sourceId}`, data);
  }
}

export default API;
