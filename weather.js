const input = document.getElementById('input')

input.addEventListener('keyup', (e) => {
    if(e.keyCode == 13){
        getData()
        getAstro()
        getForecast()
    }
})

let popUP = document.querySelector(".popUp-sources")

function openPopup() {
    popUP.classList.add("openPopUp-sources")
    console.log('the content has been poped.')

}

function closePopup() {
    popUP.classList.remove("openPopUp-sources")
}

const getData = () => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText)
            //console.log(data)
            const name = data.location.name
            document.getElementById('cityName').textContent = name;
            //picture icon
            //celcius
            const celcius = data.current.temp_c 
            document.getElementById('celcius').innerHTML = celcius + "&#8451;"
            //time
            const localtime = data.location.tz_id
            document.getElementById('time').innerHTML = localtime
            //condition text
            const conText = data.current.condition.text
            document.getElementById('condition-text').textContext = conText
            //latitude
            const latitude = data.location.lat
            document.getElementById('lat').innerHTML = latitude + " lat"
            //longtitude
            const longtitude = data.location.lon
            document.getElementById('long').innerHTML = longtitude + " lon"
            //fetch wind
            const wind = data.current.wind_degree
            const windMph = data.current.wind_mph
            const windKph = data.current.wind_kph
            document.getElementById('wind').innerHTML = wind + "&#8451;"
            document.getElementById('wmph').innerHTML = windMph + " mph"
            document.getElementById('wkph').innerHTML = windKph + " kph"
            //fetch precipitation
            const precip = data.current.precip_mm
            const pInch = data.current.precip_in
            document.getElementById('precip').innerHTML = precip + " mm"
            document.getElementById('pInch').innerHTML = pInch + " inch"
            //fetch humidity
            const humid = data.current.humidity
            document.getElementById('humid').innerHTML = humid + " %"
            const humidity = document.getElementById('humidText')
            if(humid <= 55){
                humidity.textContent = "Normal level, dry and comfortable"
            }else if(humid > 55 && humid < 65){
                humidity.textContent = "Becomes sticky with muggy evenings"
            }else{
                humidity.textContent = "has a lot of moisture in the air"
            }
            //fetch cloud
            const cloud = data.current.cloud
            document.getElementById('cloud').innerHTML = cloud + ""
            //fetch feelslike
            const fl = data.current.feelslike_c
            document.getElementById('fl').innerHTML = fl + "&#8451;"
            const flF = data.current.feelslike_f
            document.getElementById('fl-F').innerHTML = flF + "&#8457;"
            //fetch uv
            const uv = data.current.uv
            document.getElementById('uv').textContent = uv
            //search bar con data
            //fetch calendar date & time
            const loc = data.location.localtime
            document.getElementById('loctime').innerHTML = loc
            //fetch timezone 
            const tz = data.location.country
            document.getElementById('tz').innerHTML = tz

            //ICON
            let iconImg = document.getElementById('icon')
            const icon = data.current.condition.text
            if(icon === "Sunny"){
                iconImg.src = "sun (2).png"
            }else if(icon === "Light rain shower"){// || "Light rain"){
                iconImg.src = "light-rain (1).png"
            }else if(icon === "Patchy rain possible" || "Overcast"){
                iconImg.src = "cloudy (1).png"
            }else if(icon === "Patchy light rain with thunder"){
                iconImg.src = "thunderstorm.png"
            }else if(icon === "Partly cloudy"){
                iconImg.src = "partly-cloudy (1).png"
            }else if(icon === "Mist"){
                iconImg.src = "mist (1).png"
            }else if(icon === "Clear"){
                iconImg.src = "cloud-computing (1).png"
            }else{
                console.log('Aki pogi')
            }
            document.querySelector('.wrapper').style.display = "flex"
            document.querySelector('.astronomy-container').style.display = "flex"
        }if(request.status === 400){
            document.getElementById('searchStatus').src = "https://icon-library.com/images/found-icon/found-icon-28.jpg"
            document.querySelector('.wrapper').style.display = "none"
            document.querySelector('.astronomy-container').style.display = "none"
        }
    })

const userInput = document.getElementById('input').value

//if(userInput === undefined){
//    document.getElementById('searchStatus').src = 'searchNotFound.png'
//}else{
//    console.log('hello world')
//}


request.open('GET', `http://api.weatherapi.com/v1/current.json?key=89cbe64c31b7440a91734618230804&q=${userInput}&aqi=yes`)
request.send()
}


const getAstro = () => {
    const req = new XMLHttpRequest();

    req.addEventListener('readystatechange', () => {
        if(req.readyState === 4 && req.status === 200){
            const dt = JSON.parse(req.responseText)
            // fetch moon phase
            const mp = dt.astronomy.astro.moon_phase
            document.getElementById('moonPhase').textContent = mp;
            // fetch rise time
            const mr = dt.astronomy.astro.moonrise
            document.getElementById('moonRise').innerHTML = mr;
            //fetch set time
            const ms = dt.astronomy.astro.moonset
            document.getElementById('moonSet').innerHTML = ms
            // fetch illumination
            const illu = dt.astronomy.astro.moon_illumination
            document.getElementById('moonIllu').innerHTML = illu
            // fetch sunrise
            const sr = dt.astronomy.astro.sunrise
            document.getElementById('sunRise').innerHTML = sr
            // fetch sunset
            const ss = dt.astronomy.astro.sunset
            document.getElementById('sunSet').textContent = ss

            document.querySelector('.wrapper').style.display = "flex"
            document.querySelector('.astronomy-container').style.display = "flex"

        }if(request.status === 400){
            document.getElementById('searchStatus').src = "searchNotFound.png"
            document.querySelector('.wrapper').style.display = "none"
            document.querySelector('.astronomy-container').style.display = "none"
        }
    })


const date = new Date()
let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDay()

let currentDate = `${year}-${month}-${day}`
let userInput = document.getElementById('input').value

req.open('GET', `http://api.weatherapi.com/v1/astronomy.json?key=89cbe64c31b7440a91734618230804&q=${userInput}&dt=${currentDate}`)
req.send()
}

//getAstro()

const isTranslated = true

function trans() {
    if(isTranslated){
        document.querySelector('.title').textContent = "WEATHERING WITH YOU APP"
        document.getElementById('trans').textContent = "original"
    }
}

const getForecast = () => {
    const r = new XMLHttpRequest();

    r.addEventListener('readystatechange', () => {
        if(r.readyState === 4 && r.status === 200){
            const data_f = JSON.parse(r.responseText)
            //DAY 1
            //fetch d1 date
            const d1_date = data_f.forecast.forecastday[0].date
            document.getElementById('daydate').textContent = d1_date
            //fetch d1 icon
            const d1_icon = data_f.forecast.forecastday[0].day.condition.icon
            //document.getElementById('forecastIcon').src = d1_icon
            //fecth d1 def text
            const d1_forecastText = data_f.forecast.forecastday[0].day.condition.text
            document.getElementById('forecastText').textContent = d1_forecastText
            //fetch d1 average temp
            const d1_avTemp = data_f.forecast.forecastday[0].day.avgtemp_c
            document.getElementById('averageTemperature').innerHTML = d1_avTemp + "&#8451;"
            //fetch rain possibility
            const d1_rain = data_f.forecast.forecastday[0].day.daily_will_it_rain
            document.getElementById('rain').innerHTML = "&#127783;" + d1_rain
            const d1_snow = data_f.forecast.forecastday[0].day.daily_will_it_snow
            document.getElementById('snow').innerHTML = "&#10052;" + d1_snow
            //DAY 2
            //fetch d2 date
            const d2_date = data_f.forecast.forecastday[1].date
            document.getElementById('daydate2').textContent = d2_date
            //fetch d2 icon
            const d2_icon = data_f.forecast.forecastday[1].day.condition.icon
            //document.getElementById('forecastIcon2').src = d2_icon
            //fetch d2 def text
            const d2_forecastText = data_f.forecast.forecastday[1].day.condition.text
            document.getElementById('forecastText2').textContent = d2_forecastText
            //fetch d2 avg temp
            const d2_avTemp = data_f.forecast.forecastday[1].day.avgtemp_c
            document.getElementById('averageTemperature2').innerHTML= d2_avTemp + "&#8451;"
            //fetch d2 rain
            const d2_rain = data_f.forecast.forecastday[1].day.daily_will_it_rain
            document.getElementById('rain2').innerHTML = "&#127783;" + d2_rain
            const d2_snow = data_f.forecast.forecastday[1].day.daily_will_it_snow
            document.getElementById('snow2').innerHTML = "&#10052;" + d2_snow
            //DAY 3
            //fetch d3 date
            const d3_date = data_f.forecast.forecastday[2].date
            document.getElementById('daydate3').textContent = d3_date
            //fetch d3 icon
            const d3_icon = data_f.forecast.forecastday[2].day.condition.icon
            //document.getElementById('forecastIcon3').src = d3_icon
            //fetch d3 def text
            const d3_forecastText = data_f.forecast.forecastday[2].day.condition.text
            document.getElementById('forecastText3').textContent = d3_forecastText
            //fetch d3 avg temp
            const d3_avTemp = data_f.forecast.forecastday[2].day.avgtemp_c
            document.getElementById('averageTemperature3').innerHTML = d3_avTemp + "&#8451;"
            //fetch d3 rain
            const d3_rain = data_f.forecast.forecastday[2].day.daily_will_it_rain
            document.getElementById('rain3').innerHTML = "&#127783;" + d3_rain
            //fetch d3 snow
            const d3_snow = data_f.forecast.forecastday[2].day.daily_will_it_snow
            document.getElementById('snow3').innerHTML = "&#10052;" + d3_snow
            //DAY 4
            //fetch d4 date
            //const d4_date = data_f.forecast.forecastday[3].date
            //document.getElementById('daydate4').textContent = d4_date
            //fetch d4 icon
            const d4_icon = data_f.forecast.forecastday[3].day.condition.icon
            //document.getElementById('forecastIcon4').src = d4_icon
            //fetch d4 def text
            const d4_forecastText = data_f.forecast.forecastday[3].day.condition.text
            document.getElementById('forecastText4').textContent = d4_forecastText
            //fetch d4 avg temp
            const d4_avTemp = data_f.forecast.forecastday[3].day.avgtemp_c
            document.getElementById('averageTemperature4').innerHTML = d4_avTemp + "&#8451;"
            //fetch d4 rain
            const d4_rain = data_f.forecast.forecastday[3].day.daily_will_it_rain
            document.getElementById('rain4').innerHTML = "&#127783;" + d4_rain
            //fetch d4 snow
            const d4_snow = data_f.forecast.forecastday[3].day.daily_will_it_snow
            document.getElementById('snow4').innerHTML = "&#10052;" + d4_snow
            //DAY 5
            //fetch d5 date
            const d5_date = data_f.forecast.forecastday[4].date
            document.getElementById('daydate5').textContent = d5_date
            //fetch d5 icon
            const d5_icon = data_f.forecast.forecastday[4].day.condition.icon
            //document.getElementById('forecastIcon5').src = d5_icon
            //fetch d5 def text
            const d5_forecastText = data_f.forecast.forecastday[4].day.condition.text
            document.getElementById('forecastText5').textContent = d5_forecastText
            //fetch d5 avg temp
            const d5_avTemp = data_f.forecast.forecastday[4].day.avgtemp_c
            document.getElementById('averageTemperature5').innerHTML = d5_avTemp + "&#8451;"
            //fetch d5 rain
            const d5_rain = data_f.forecast.forecastday[4].day.daily_will_it_rain
            document.getElementById('rain5').innerHTML = "&#127783;" + d5_rain
            //fetch d5 snow
            const d5_snow = data_f.forecast.forecastday[4].day.daily_will_it_snow
            document.getElementById('snow5').innerHTML = "&#10052;" + d5_snow
            //DAY 6
            //fetch d6 date
            const d6_date = data_f.forecast.forecastday[5].date
            document.getElementById('daydate6').textContent = d6_date
            //fetch d6 icon
            const d6_icon = data_f.forecast.forecastday[5].day.condition.icon
            //document.getElementById('forecastIcon6').src = d6_icon
            //fetch d6 def text
            const d6_forecastText = data_f.forecast.forecastday[5].day.condition.text
            document.getElementById('forecastText6').textContent = d6_forecastText
            //fetch d6 avg temp
            const d6_avTemp = data_f.forecast.forecastday[5].day.avgtemp_c
            document.getElementById('averageTemperature6').innerHTML = d6_avTemp + "&#8451;"
            //fetch d6 rain
            const d6_rain = data_f.forecast.forecastday[5].day.daily_will_it_rain
            document.getElementById('rain6').innerHTML = "&#127783;" + d6_rain
            //fetch d6 snow
            const d6_snow = data_f.forecast.forecastday[5].day.daily_will_it_snow
            document.getElementById('snow6').innerHTML = "&#10052;" + d6_snow
            //DAY 7
            //fetch d7 date
            const d7_date = data_f.forecast.forecastday[6].date
            document.getElementById('daydate7').textContent = d7_date
            //fetch d7 icon
            const d7_icon = data_f.forecast.forecastday[6].day.condition.icon
            //document.getElementById('forecastIcon7').src = d7_icon
            //fetch d7 def text
            const d7_forecastText = data_f.forecast.forecastday[6].day.condition.text
            document.getElementById('forecastText7').textContent = d7_forecastText
            //fetch d7 avg temp
            const d7_avTemp = data_f.forecast.forecastday[6].day.avgtemp_c
            document.getElementById('averageTemperature7').innerHTML = d7_avTemp + "&#8451;"
            //fetch d7 rain
            const d7_rain = data_f.forecast.forecastday[6].day.daily_will_it_rain
            document.getElementById('rain7').innerHTML = "&#127783;" + d7_rain
            //fetch d7 snow
            const d7_snow = data_f.forecast.forecastday[6].day.daily_will_it_snow
            document.getElementById('snow7').innerHTML = "&#10052;" + d7_snow
    
            document.querySelector('.wrapper').style.display = "flex"
            document.querySelector('.astronomy-container').style.display = "flex"
           
        }if(request.status === 400){
            document.getElementById('searchStatus').src = "searchNotFound.png"
            document.querySelector('.wrapper').style.display = "none"
            document.querySelector('.astronomy-container').style.display = "none"
        }
    })

let userInput = document.getElementById('input').value

r.open('GET', `http://api.weatherapi.com/v1/forecast.json?key=89cbe64c31b7440a91734618230804&q=${userInput}&days=7&aqi=yes&alerts=no`)
r.send()
}
