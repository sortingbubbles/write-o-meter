export const API_HOST = 'https://vzjega.deta.dev'
// export const API_HOST = 'http://localhost:8000'

export function analyzeWithSpacy(text: string) {
  return fetch(`${API_HOST}/analyze-spacy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  })
}


export function analyzeWithCustomAlgorithms(text: string) {
  return fetch(`${API_HOST}/analyze-custom`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  })
}
