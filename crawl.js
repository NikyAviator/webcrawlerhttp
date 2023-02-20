const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      // relative
      urls.push(`${baseURL}${linkElement.href}`);
    } else {
      // absolute
      urls.push(linkElement.href);
    }
  }
  return urls;
}

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
  getURLsFromHTML,
};
