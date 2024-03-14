<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
      v-if="weatherData"
      class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <!-- Current Weather Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                :src="`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`"
                alt="Weather icon"
                class="h-10 w-10"
              />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-lg font-medium text-gray-500 truncate">
                  Weather in {{ weatherData.name }}
                </dt>
                <dd>
                  <div class="text-sm font-medium text-gray-900 mt-4">
                    {{ weatherData.weather[0].main }}
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    Temperature:
                    {{ (weatherData.main.temp - 273).toFixed(1) }}°C
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    Feels Like:
                    {{ (weatherData.main.feels_like - 273).toFixed(1) }}°C
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    Humidity: {{ weatherData.main.humidity }}%
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    Wind Speed: {{ weatherData.wind.speed }} m/s
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- 5-Day Forecast -->
      <div
        v-if="forecastData"
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="p-5">
          <h3 class="text-lg font-medium text-gray-500 mb-4">5-Day Forecast</h3>
          <div class="grid grid-cols-1 gap-2">
            <div
              v-for="(forecast, index) in forecastData.list"
              :key="index"
              class="bg-gray-100 rounded-lg p-2"
            >
              <div class="flex justify-between">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatDate(forecast.dt_txt) }}
                </div>
                <div class="text-sm font-medium text-gray-900">
                  {{ (forecast.main.temp - 273).toFixed(1) }}°C
                </div>
              </div>
              <div class="text-xs text-gray-600">
                <img
                  :src="`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`"
                  alt="Weather icon"
                  class="h-10 w-10"
                />
                {{ forecast.weather[0].main }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          @click="goBack"
          class="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return To Home
        </button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const weatherData = ref(null);
    const forecastData = ref(null);

    const getWeatherData = async () => {
      try {
        const { latitude, longitude, apiKey } = store.state.location;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );

        weatherData.value = response.data;
        forecastData.value = forecastResponse.data;
        console.log(forecastData.value);
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(getWeatherData);

    const goBack = () => {
      window.location.href = "/homePage";
    };

    function formatDate(dt_txt) {
      let date = new Date(dt_txt);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "  " +
        " - " +
        strTime
      );
    }

    return { weatherData, goBack, forecastData, formatDate };
  },
};
</script>
