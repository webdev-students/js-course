// Lesson 12.5 — Promise.all, debounce and stale results
const getJSON = async (url) => (await fetch(url)).json();
