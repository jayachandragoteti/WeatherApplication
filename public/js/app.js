const ErrorMsg = document.querySelector('.ErrorMsg')
var weatherForm = document.querySelector('#FormSearchLocation')
const search = document.querySelector('#SearchLocation')
const temperature = document.querySelector('.temperature')
const weather_icons = document.querySelector('.weather_icons')
const weather_descriptions = document.querySelector('.weather_descriptions')
const feels_like = document.querySelector('.feels_like')
const humidity = document.querySelector('.humidity')
const wind_speed = document.querySelector('.wind_speed')
const observation_time = document.querySelector('.observation_time')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    temperature.textContent = 'Loading...'
    weather_descriptions.textContent = ''
    ErrorMsg.textContent = ""
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                ErrorMsg.textContent = data.error
            }else if (data.Error) {
                ErrorMsg.textContent = data.Error
            }else {
                temperature.textContent = data.temperature
                weather_descriptions.textContent = data.weather_descriptions
                weather_icons.src = data.weather_icons
                feels_like.textContent = data.feelslike
                humidity.textContent = data.humidity
                wind_speed.textContent = data.wind_speed
                observation_time.textContent = data.observation_time
            }
        })
    })
})