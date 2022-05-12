const authorName = document.getElementById('author-name');
const bodyEl = document.body;
const cryptoEl = document.querySelector('.crypto-main');
const cryptoInfo = document.querySelector('.crypto-info');
const timeEl = document.querySelector('.time-holder');
const weatherInfoEl = document.querySelector('.weather-info');
const weatherCityEl = document.querySelector('.weather-city');

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        // console.log(data.urls.regular)
        // console.log(data.user.name)
        bodyEl.style.backgroundImage = `url(${data.urls.regular})`;
        authorName.innerText = `Photo: ${data.user.name}`
    })
    .catch(err => {
        bodyEl.style.backgroundImage = `url(https://images.unsplash.com/photo-1542856391-010fb87dcfed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTIxMTc1MTc&ixlib=rb-1.2.1&q=80&w=1080https://images.unsplash.com/photo-1542856391-010fb87dcfed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTIxMTc1MTc&ixlib=rb-1.2.1&q=80&w=1080)`;   
    })

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
        if(!res.ok) {
            throw Error('Something went wrong!')
        }
        return res.json()
    })
    .then(data => {
        console.log(data),
        cryptoEl.innerHTML = `
            <img class="crypto-img" src=${data.image.small}>
            <span class="crypto-name">${data.name}<span>
        `,
        cryptoInfo.innerHTML = `
            <p>Current price: USD ${data.market_data.current_price.usd}<p>
            <p>24-hour high price: USD ${data.market_data.high_24h.usd}<p>
            <p>24-hour low price: USD ${data.market_data.low_24h.usd}<p>
        `

    })
    .catch(err => console.log(err))

function doDate() {
    let date = new Date();
    timeEl.textContent = date.toLocaleTimeString("es-ar", {timeStyle: "short"})
}
setInterval(doDate, 1000);

navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    .then(res => {
        if(!res.ok) {
            throw Error("Weather data not available")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        console.log(data.weather[0].icon)
        const weatherIcon = data.weather[0].icon;
        weatherCityEl.innerHTML = `
            <h3>${data.name}</h3>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png"/>
        `
        weatherInfoEl.innerHTML = `
            <p>Temp: ${data.main.temp} C<p>
            <p>Max: ${data.main.temp_max} C<p>
            <p>Min: ${data.main.temp_max} C<p>
            <p>Sens: ${data.main.feels_like} C<p>
        `
        
    })
    .catch(err => console.log(err))
  })
  


