export function formatDateToLocalString(date: Date): string {
  const tzOffset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - tzOffset)
  return localDate.toISOString().split('T')[0]
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}
