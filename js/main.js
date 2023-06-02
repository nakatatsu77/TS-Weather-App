"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
require('dotenv').config();
// OpenWeatherMap API KEY
var API_KEY = process.env.Weather_API_KEY;
// DOMの取得
var form = document.getElementById('form');
var cityInput = document.getElementById('city');
var resultDiv = document.getElementById('result');
// 現在の日付を取得する関数
function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('00' + (date.getMonth() + 1)).slice(-2);
    var day = ('00' + date.getDate()).slice(-2);
    return "".concat(year, "\u5E74").concat(month, "\u6708").concat(day, "\u65E5");
}
// 検索した地域の天気を取得
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var cityName = cityInput.value;
    // getWeather関数呼び出し
    getWeather(cityName);
});
// 天気情報を取得する関数
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(API_KEY))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()
                        // 温度をケルビンから摂氏に変換
                    ];
                case 2:
                    data = _a.sent();
                    // 温度をケルビンから摂氏に変換
                    data.main.temp = data.main.temp - 273.15;
                    displayWeather(data);
                    return [2 /*return*/];
            }
        });
    });
}
// 取得した天気情報を表示する関数
// 分割代入で(data)からname, main: { temp, humidity }, weatherを取り出す
function displayWeather(data) {
    var name = data.name, _a = data.main, temp = _a.temp, humidity = _a.humidity, weather = data.weather;
    // console.log(data.weather) // descriptionの値が格納されている
    var weatherData = weather[0];
    // 再度分割代入でdescriptionを取り出す。
    var description = weatherData.description;
    // お天気情報を日本語にする。
    var JaWeather = {
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
    };
    // JaWeatherに格納された日本語以外の場合、そのまま表示させる。
    var weatherJP = JaWeather[description] || description;
    // 温度を小数点以下1桁に丸める
    var tempRounded = Math.round(temp * 10) / 10;
    // 検索結果表示
    resultDiv.innerHTML = "<h2>".concat(name, "</h2><h3>").concat(getCurrentDate(), "</h3><h3>").concat(tempRounded, "\u2103\u3001").concat(weatherJP, "\u3001\u6E7F\u5EA6\uFF1A").concat(humidity, "\uFF05</h3>");
}
