export const API_HOST = 'https://vzjega.deta.dev'

export function analyze(text: string) {
  return fetch(`${API_HOST}/analyse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  })
}
