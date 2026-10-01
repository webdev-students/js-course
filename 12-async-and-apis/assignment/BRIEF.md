# Assignment: Weather App

**Module 12 · Async JS & APIs** · Time: about 2 hours

## Why this assignment?
Real, live data from the internet, with everything that can go wrong along the way. You'll chain two API calls, handle loading and errors properly, and remember the user's recent searches — the same skills the Checkout store uses to load products.

## The APIs
[Open-Meteo](https://open-meteo.com) is free and needs **no key** — so it's safe to call from the browser.
- **Geocoding** — city name → coordinates:
  `https://geocoding-api.open-meteo.com/v1/search?name=London&count=1&language=en`
  → `{ results: [{ name: 'London', country: 'United Kingdom', latitude: 51.51, longitude: -0.13, … }] }` (no `results` at all when nothing matches).
- **Forecast** — coordinates → weather:
  `https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`
  → `current` (one set of values) and `daily` (parallel arrays: `time`, `weather_code`, `temperature_2m_max`, `temperature_2m_min`).

Try both addresses in your browser first!

## What you'll build
A search box for a city. After searching: the city and country, the current temperature, a description (like "Partly cloudy"), the wind speed, and a 3-day forecast (Today, then weekday names, each with a description and max / min). Plus the last three cities searched, as buttons.

## Requirements
1. **`getJSON(url)`** — fetch, check `response.ok`, throw an error with `error.status`, return the JSON.
2. **`findCity(name)`** — returns the first result, or throws an error with `status = 404` when there isn't one. Use `URLSearchParams`.
3. **`getWeather(city)`** — builds the forecast address with `URLSearchParams`.
4. **A lookup table** `WEATHER_CODES` for at least: 0, 1, 2, 3, 45, 61, 63, 65, 80, 95 — and a fallback for unknown codes.
5. **State + render** with `idle`, `loading`, `success` and `error`. `aria-busy` while loading; `role="alert"` for errors.
6. **Errors**: a not-found city → `We couldn't find "Xyzzy". Check the spelling and try again.`; anything else → a friendly "try again" message.
7. **Recent searches**: the last 3 city names in localStorage (newest first, no duplicates), shown as buttons that search again (event delegation). Load them safely.
8. City names from the API go into the page with `textContent` (or escaped).

## Acceptance checklist
- [ ] Searching `London` shows "London, United Kingdom", a temperature in °C, and 3 forecast days.
- [ ] Searching `xyzzy` shows the not-found message.
- [ ] With DevTools → Network → **Offline**, searching shows the "try again" message.
- [ ] After searching two cities and refreshing, both appear as recent buttons, newest first.
- [ ] Clicking a recent button loads that city.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| API calls | 6 | Helper with `ok` check; two dependent awaits; `URLSearchParams` |
| States | 5 | Idle, loading, success, error — only one at a time |
| Weather display | 4 | Lookup table; correct forecast days from the parallel arrays |
| Recent searches | 3 | Saved safely; newest first; no duplicates; buttons work |
| Safety + tidy code | 2 | `textContent` for API text; clear small functions |

## Stretch goals
- A °C / °F toggle (remembered in localStorage). Open-Meteo accepts `temperature_unit=fahrenheit`.
- Use the browser's location: `navigator.geolocation.getCurrentPosition` (look it up on MDN).
- Debounce a live "suggestions" list while the user types, using `count=5` in the geocoding request.

## Remember
Try for at least 45 minutes before watching the solution video.
