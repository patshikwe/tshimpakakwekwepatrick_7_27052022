// Réglage date et heures
export const timestampParser = (num) => {
  let options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  let date = new Date(num).toLocaleDateString('fr-FR', options)

  return date.toString()
}
