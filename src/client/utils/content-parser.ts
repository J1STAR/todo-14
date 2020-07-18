export const parseContent = (content: string): [string, string] => {
  const firstNewLineIdx = content.indexOf('\n')

  if (firstNewLineIdx < 0) {
    return [content, '']
  }

  return [
    content.slice(0, firstNewLineIdx),
    content.slice(firstNewLineIdx + 1, content.length),
  ]
}
