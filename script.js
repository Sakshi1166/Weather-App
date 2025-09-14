const apiKey = "3de4d996c3b14ee2b3e203436251409";
const form = document.getElementById("weatherForm");
const locationInput = document.getElementById("locationInput");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location) {
    getWeather(location);
  }
});

async function getWeather(location) {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>🌡 Temperature: ${data.current.temp_c}°C</p>
      <p>☁ Condition: ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="Weather icon">
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
}
