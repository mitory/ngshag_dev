export const textService = { appendLine }

function appendLine(line, text, textLines) {
    const int = setInterval(() => {
        console.log(line)
        console.log(text)
        console.log(textLines)
        if (line < text.length) {
            textLines.push(text[line])
            ++line;
        } else {
            clearInterval(int)
        }
    }, 2000)
}