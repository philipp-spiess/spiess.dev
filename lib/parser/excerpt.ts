export function excerpt(text: string, limit = 144) {
  let result = ""

  for (const word of text.split(" ")) {
    if (result.length + word.length + 1 <= limit) {
      result += ` ${word}`
    } else {
      // Fix trailing comma. Might need a more generic solution at some point :D
      if (result.endsWith(",")) {
        result = result.slice(0, -1)
      }
      result += "…"
      break
    }
  }

  return result.trim()
}
