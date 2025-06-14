export function formatDateToLocalString(date: Date): string {
  const tzOffset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - tzOffset)
  return localDate.toISOString().split('T')[0]
}