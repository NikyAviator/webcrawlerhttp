function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    // return everything except last char (if the lastchar is a '/')
    return hostPath.slice(0, -1);
  }
  // annars return hostPath
  return hostPath;
}

module.exports = {
  normalizeURL,
};
