// Return native DOMException on modern Node environments
module.exports = globalThis.DOMException || Error;
