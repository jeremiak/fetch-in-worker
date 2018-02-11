onmessage = function(e) {
  const url = e.data[0]
  const opts = e.data[1]

  fetch(url, opts).then(response => {
    const desiredKeys = ['headers', 'status', 'url']
    const desired = desiredKeys.map(d => {
      let value = response[d]
      if (typeof value === 'object') {
        value = JSON.parse(JSON.stringify(value))
      }
      return { [d]: value }
    })
    response.json().then(json => {
      const data = Object.assign({}, ...desired, { json })
      postMessage(data)
      close()
    })
  }).catch(error => {
    debugger
  })
}
