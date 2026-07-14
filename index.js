// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

function fetchWeatherData(state) {
  return fetch(weatherApi + state)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      return response.json()
    })
}

function displayWeather(data) {
  const displayDiv = document.getElementById("alerts-display")
  displayDiv.innerHTML = ""

  const alerts = data.features || []

  const summary = document.createElement("h2")
  summary.textContent = `${data.title}: ${alerts.length}`
  displayDiv.append(summary)

  const list = document.createElement("ul")
  alerts.forEach((alert) => {
    const item = document.createElement("li")
    item.textContent = alert.properties.headline
    list.append(item)
  })
  displayDiv.append(list)
}

function displayError(message) {
  const errorDiv = document.getElementById("error-message")
  errorDiv.textContent = message
  errorDiv.classList.remove("hidden")
}

function clearError() {
  const errorDiv = document.getElementById("error-message")
  errorDiv.textContent = ""
  errorDiv.classList.add("hidden")
}

function handleFetchClick() {
  const input = document.getElementById("state-input")
  const state = input.value
  input.value = ""

  fetchWeatherData(state)
    .then((data) => {
      clearError()
      displayWeather(data)
    })
    .catch((error) => {
      displayError(error.message)
    })
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("fetch-alerts")
  button.addEventListener("click", handleFetchClick)
})

module.exports = { fetchWeatherData, displayWeather, displayError }