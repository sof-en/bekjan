const searchEl = document.querySelector('#search');
const formEl = document.querySelector('form');


function getWeatherData(cityName = 'Nukus') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=a045a1a5356155dc5712ab1318762afa`)
        .then(res => res.json())
        .then(data => {
            generateWeatherInfo(data)
            console.log(data)
        }).catch(err => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Неверно указан город или страна",
                showConfirmButton: false,
                timer: 1500
            });
        })
}

function generateWeatherInfo(data) {
    document.querySelector('.wrapper').style.backgroundImage = `url(${backimg(data.weather[0].main)})`
    document.querySelector('.conatiner').innerHTML = '';
    document.querySelector('.conatiner').innerHTML =
        `
        <div class="weather">
            <div class="img-text">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="e">
            </div>
            <div class="texts">
                <span>${data.main.temp}°C</span>
                <span>${data.name} ${data.sys.country}</span>
                <span>${data.weather[0].main}</span>
            </div>
        </div>
    `
}

function backimg(type) {
    switch (type) {
        case 'Clouds': {
            return 'https://www.shutterstock.com/shutterstock/videos/11746343/thumb/10.jpg?ip=x480'
        }
        case 'Rain': {
            return 'https://images.pexels.com/photos/373481/pexels-photo-373481.jpeg?cs=srgb&dl=pexels-pixabay-373481.jpg&fm=jpg'
        }
        case 'Clear': {
            return 'https://i.pinimg.com/originals/ff/c6/4c/ffc64cc10b554c306e3e53925265405a.jpg'
        }
        case 'Snow': {
            return 'https://efirq7mmtwd.exactdn.com/wp-content/uploads/2023/12/snowy-landscape-385473973.jpg?lossy=1&ssl=1&fit=1082,722'
        }
        case 'Fog': {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42T3Q7rmCwBxXGVu08fzJgB_RcEf2AkFuBQ&usqp=CAU'
        }
        case 'Mist': {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42T3Q7rmCwBxXGVu08fzJgB_RcEf2AkFuBQ&usqp=CAU'
        }
        default: {
            return 'https://i.pinimg.com/originals/ff/c6/4c/ffc64cc10b554c306e3e53925265405a.jpg'
        }
    }
}


formEl.addEventListener('submit', event => {
    event.preventDefault()
    getWeatherData(searchEl.value);
    searchEl.value = '';
})


getWeatherData()