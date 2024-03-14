<template>
  <div class="flex justify-between items-center bg-gray-200 p-4">
    <div class="text-lg font-bold">{{ user.username }}</div>
    <div class="text-3xl font-bold text-teal-500">Weather App</div>
    <button
      @click="getUserLocations"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      :class="disableShowLoc ? 'bg-blue-300' : 'hover:bg-blue-600'"
      :disabled="disableShowLoc"
    >
      Show Saved Locations
    </button>
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
          <div
            v-for="(result, index) in searchResults"
            :key="index"
            class="flex justify-between items-center hover:bg-blue-200"
            style="margin-right: 20px"
          >
            <button @click="selectResult(result)" class="py-2">
              <p>{{ result.name }}, {{ result.country }}</p>
            </button>
            <button
              @click="
                addNewLocation(user.id, result.name, result.lat, result.lon)
              "
              class="bg-green-500 hover:bg-green-700 text-white px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
    <div>
      <div class="flex flex-col">
        <h3
          class="flex justify-center text-lg"
          v-if="savedLocations.length == 0 ? false : true"
        >
          Saved Locations
        </h3>
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="mt-3 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(location, index) in savedLocations" :key="index">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-black"
                      width="80%"
                    >
                      {{ location.name }}
                    </td>
                    <td>
                      <button
                        class="bg-green-200 text-black py-2 px-4 rounded hover:bg-green-500 hover:text-white"
                      >
                        Show Weather
                      </button>
                    </td>
                    <td>
                      <button
                        @click="deleteLocationById(location.id)"
                        class="bg-red-200 text-black py-2 px-4 rounded hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import Swal from "sweetalert2";

export default {
  setup() {
    const store = useStore();
    const user = store.state.user;
    const searchQuery = ref("");
    const searchResults = ref([]);
    const selectedResult = ref(null);
    const apiKey = "c730a04e6fc23f790e2f3471f66d8214";
    const cuurentLatitude = ref(null);
    const currentLongitude = ref(null);
    const savedLocations = ref([]);
    const disableShowLoc = ref(false);

    const logout = () => {
      // Handle logout logic
    };

    const selectResult = (result) => {
      selectedResult.value = result;
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          cuurentLatitude.value = position.coords.latitude;
          currentLongitude.value = position.coords.longitude;
          await getWeatherData();
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    watch(searchQuery, async (newQuery) => {
      if (newQuery) {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${newQuery}&limit=3&appid=${apiKey}`
        );
        searchResults.value = response.data;
      }
    });

    const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cuurentLatitude.value}&lon=${currentLongitude.value}&appid=${apiKey}`
        );
        console.log(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    const getUserLocations = async () => {
      try {
        const { result } = useQuery(
          gql`
            query locationsByUser($userId: ID!) {
              locationsByUser(user_id: $userId) {
                id
                name
                latitude
                longitude
              }
            }
          `,
          {
            userId: user.id,
          }
        );
        const savedLocationsMap = new Map(
          savedLocations.value.map((location) => [location.id, location])
        );

        result.value.locationsByUser.forEach((location) => {
          savedLocationsMap.set(location.id, location);
        });

        savedLocations.value = Array.from(savedLocationsMap.values());
        console.log(savedLocations.value);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      getLocation();
    });

    const DELETE_LOCATION_MUTATION = gql`
      mutation deleteLocation($id: ID!) {
        deleteLocation(id: $id) {
          id
          name
          latitude
          longitude
        }
      }
    `;

    const { mutate: deleteLocation } = useMutation(DELETE_LOCATION_MUTATION);

    const deleteLocationById = async (id) => {
      try {
        await deleteLocation({ id });
        disableShowLoc.value = true;
        savedLocations.value = savedLocations.value.filter(
          (location) => location.id !== id
        );
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Location Deleted Successfully",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Failed to delete location",
        });
      }
    };

    const ADD_LOCATION_MUTATION = gql`
      mutation addLocation(
        $user_id: ID!
        $name: String!
        $latitude: String!
        $longitude: String!
      ) {
        addLocation(
          user_id: $user_id
          name: $name
          latitude: $latitude
          longitude: $longitude
        ) {
          id
          user_id
          name
          latitude
          longitude
        }
      }
    `;

    const { mutate: addLocation } = useMutation(ADD_LOCATION_MUTATION);

    const addNewLocation = async (user_id, name, latitude, longitude) => {
      try {
        const response = await addLocation({
          user_id,
          name,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Location Added Successfully",
        });

        savedLocations.value = [
          ...savedLocations.value,
          {
            id: response.data.addLocation.id,
            name: response.data.addLocation.name,
            lat: response.data.addLocation.latitude,
            lon: response.data.addLocation.longitude,
          },
        ];
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Failed to add location",
        });
      }
    };

    return {
      user,
      logout,
      searchQuery,
      searchResults,
      selectResult,
      selectedResult,
      cuurentLatitude,
      currentLongitude,
      getWeatherData,
      getUserLocations,
      savedLocations,
      deleteLocationById,
      disableShowLoc,
      addNewLocation,
    };
  },
};
</script>
