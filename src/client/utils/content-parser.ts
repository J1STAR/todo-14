export const parseContent = (content: string): [string, string] => {
  const firstNewLineIdx = content.indexOf('\n')

  return [
    content.slice(0, firstNewLineIdx),
    content.slice(firstNewLineIdx + 1, content.length),
  ]
}
