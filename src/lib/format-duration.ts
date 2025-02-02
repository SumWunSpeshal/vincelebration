export function formatDuration(durationInS: number) {
  return (`${Math.floor((durationInS ?? 0) / 60)}`).padStart(2, '0') + ':' + (`${Math.floor(durationInS % 60)}`).padStart(2, '0')
}