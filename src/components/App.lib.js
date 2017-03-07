import fetchJsonp from 'fetch-jsonp'

export function fetchWikipediaResults (wikipediaSearchUri) {
  return fetchJsonp(wikipediaSearchUri)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject({ 'bad response': res })
      }
    })
}
