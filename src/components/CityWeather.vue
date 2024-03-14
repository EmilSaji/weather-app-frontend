<template>
  <div>
    <div
      v-if="weatherData"
      class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
    >
      <div>
        <div class="text-xl font-medium text-black">
          Weather in {{ weatherData.name }}
        </div>
        <p class="text-gray-500">{{ weatherData.weather[0].description }}</p>
        <p class="text-gray-500">
          Temperature: {{ (weatherData.main.temp - 273).toFixed(1) }}°C
        </p>
        <p class="text-gray-500">
          Feels Like: {{ (weatherData.main.feels_like - 273).toFixed(1) }}°C
        </p>
        <p class="text-gray-500">Humidity: {{ weatherData.main.humidity }}%</p>
        <p class="text-gray-500">
          Wind Speed: {{ weatherData.wind.speed }} m/s
        </p>
      </div>
    </div>
    <div v-else>Loading...</div>
    <button
      @click="goBack"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Back
    </button>
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

    const getWeatherData = async () => {
      try {
        const { latitude, longitude, apiKey } = store.state.location;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );

        // // cal current date & time
        // const localOffset = new Date().getTimezoneOffset() * 60000;
        // const utc = response.data.dt * 1000 + localOffset;
        // response.data.currentTime = utc + 1000 * response.data.timezone_offset;

        // // cal hourly weather offset
        // response.data.hourly.forEach((hour) => {
        //   const utc = hour.dt * 1000 + localOffset;
        //   hour.currentTime = utc + 1000 * response.data.timezone_offset;
        // });

        weatherData.value = response.data;
        console.log(weatherData.value);
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(getWeatherData);

    const goBack = () => {
      window.location.href = "/homePage";
    };

    return { weatherData, goBack };
  },
};
</script>
