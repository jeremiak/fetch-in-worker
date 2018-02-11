/* creates a new worker for each request right now
   i can see how it would be better to build a pool
   maybe with a setting for configuring the max number
   maybe some day... */
const fetchInWorker = (url, opts = {}) => {
  const worker = new Worker('worker.js')

  return new Promise((resolve, reject) => {
    worker.onerror = (e) => {
      reject(e)
    }
    worker.onmessage = (e) => {
      const data = e.data
      const responseLike = Object.assign({}, data, {
        json: () => Promise.resolve(data.json)
      })
      resolve(responseLike)
    }
    worker.postMessage([url, opts])
  })
}

if (window.Worker) {
  window._fetch = window.fetch
  window.fetch = fetchInWorker
}
