require('dotenv').config()
// OpenWeatherMap API KEY
const API_KEY = process.env.Weather_API_KEY

// DOMの取得
const form = document.getElementById('form') as HTMLFormElement
const cityInput = document.getElementById('city') as HTMLInputElement
const resultDiv = document.getElementById('result') as HTMLDivElement

// 現在の日付を取得する関数
function getCurrentDate(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('00' + (date.getMonth() + 1)).slice(-2)
  const day = ('00' + date.getDate()).slice(-2)

  return `${year}年${month}月${day}日`
}

// 検索した地域の天気を取得
form.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  const cityName = cityInput.value
  // getWeather関数呼び出し
  getWeather(cityName)
})

// 天気情報を取得する関数
async function getWeather(city: string): Promise<void> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
  const data = await response.json()

  // 温度をケルビンから摂氏に変換
  data.main.temp = data.main.temp - 273.15

  displayWeather(data)
}

// 取得した天気情報を表示する関数
// 分割代入で(data)からname, main: { temp, humidity }, weatherを取り出す
function displayWeather(data: any): void {
  const {
    name,
    main: { temp, humidity },
    weather,
  } = data
  // console.log(data.weather) // descriptionの値が格納されている
  const [weatherData] = weather
  // 再度分割代入でdescriptionを取り出す。
  const { description } = weatherData

  // お天気情報を日本語にする。
  const JaWeather: { [index: string]: string } = {
    'clear sky': '晴れ',
    'few clouds': '少し雲',
    'scattered clouds': '散在する雲',
    'broken clouds': '雲が多い',
    'shower rain': 'にわか雨',
    'light rain': '小雨',
    'moderate rain': '雨',
    rain: '雨',
    thunderstorm: '雷雨',
    snow: '雪',
    mist: '靄',
  }

  // JaWeatherに格納された日本語以外の場合、そのまま表示させる。
  const weatherJP = JaWeather[description] || description

  // 温度を小数点以下1桁に丸める
  const tempRounded = Math.round(temp * 10) / 10

  // 検索結果表示
  resultDiv.innerHTML = `<h2>${name}</h2><h3>${getCurrentDate()}</h3><h3>${tempRounded}℃、${weatherJP}、湿度：${humidity}％</h3>`
}
