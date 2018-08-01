export default (isCorrect, message) => {
  if (!isCorrect) throw new Error(`Rereducer Error: ${message}`)
}
