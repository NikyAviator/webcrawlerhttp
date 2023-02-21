const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL - strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL - trim trailing slashes "/" ', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL - capitals ', () => {
  const input = 'https://BLOG.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL - strip http ', () => {
  const input = 'http://BLOG.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - absolute URLs', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="https://blog.boot.dev">Boot.dev blog </a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - relative URLs', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="/path/">Boot.dev blog </a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - Multiple both relative and absolute paths ', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="/path1/">Boot.dev blog path1 </a>
      <a href="https://blog.boot.dev/path2/">Boot.dev blog path2</a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2/',
  ];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - invalid URL', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="invalid">Invalid URL</a>
    </body>
  </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
