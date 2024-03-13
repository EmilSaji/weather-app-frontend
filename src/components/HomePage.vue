<template>
  <div class="flex justify-between items-center bg-gray-200 p-4">
    <div class="text-lg font-bold">{{ user.username }}</div>
    <div class="text-3xl font-bold text-teal-500">Weather App</div>
    <router-link to="/signin">
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </router-link>
  </div>
  <div class="container mx-auto p-4">
    <main class="container text-black">
      <div class="pt-4 mb-8 flex justify-center">
        <div class="max-w-xs w-full">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for a city or state"
            class="py-2 px-4 w-full bg-transparent border-b focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
          />
          <div v-for="(result, index) in searchResults" :key="index">
            <button @click="selectResult(result)">
              <p>{{ result.name }}, {{ result.country }}</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch } from "vue";
import axios from "axios";
// import { toRaw } from "vue";

export default {
  setup() {
    const store = useStore();
    const user = store.state.user;
    const searchQuery = ref("");
    const searchResults = ref([]);
    const selectedResult = ref(null);
    const apiKey = "c730a04e6fc23f790e2f3471f66d8214";

    const logout = () => {
      // Handle logout logic
    };

    const selectResult = (result) => {
      selectedResult.value = result;
      console.log(selectedResult.value);
    };

    watch(searchQuery, async (newQuery) => {
      if (newQuery) {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${newQuery}&limit=3&appid=${apiKey}`
        );
        searchResults.value = response.data;
      }
    });

    return {
      user,
      logout,
      searchQuery,
      searchResults,
      selectResult,
      selectedResult,
    };
  },
};
</script>
