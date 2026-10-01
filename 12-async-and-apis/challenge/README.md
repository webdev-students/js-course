# Challenge: Weather app

**Time:** about 45 min

Build a weather app with the free Open-Meteo APIs (no key needed):

1. A form with a city box. On submit, find the city with
   `https://geocoding-api.open-meteo.com/v1/search?name=London&count=1`
   → `{ results: [{ name: 'London', country: 'United Kingdom', latitude: 51.51, longitude: -0.13, … }] }` (no `results` at all when nothing matches).
2. Then get the weather with
   `https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current=temperature_2m,wind_speed_10m`.
3. Show `London, United Kingdom` and `12.3°C, wind 9.4 km/h` (your numbers will be different).
4. Show `Loading…` while you wait, `No city called "Xyzzy".` when nothing matches, and a friendly error if the request fails.
5. Build both addresses with `URLSearchParams`.
