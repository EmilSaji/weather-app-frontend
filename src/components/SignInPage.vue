<template>
  <div class="flex flex-col items-center p-5">
    <h1 class="text-2xl font-bold mb-5">Login</h1>
    <form
      @submit.prevent="login"
      class="w-full max-w-xs flex flex-col justify-center"
    >
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
        >Email:</label
      >
      <input
        type="email"
        id="email"
        v-model="email"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
      />
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
        >Password:</label
      >
      <input
        type="password"
        id="password"
        v-model="password"
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
      />
      <div class="text-center mt-3">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </form>
    <div class="text-lg font-bold my-3">OR</div>
    <div>
      <router-link to="/signup">
        <button
          class="mt-3 text-center py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
        >
          Create an Account
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { gql } from "graphql-tag";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    let userId = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const { result } = useQuery(
          gql`
            query loginUser($email: String!, $password: String!) {
              loginUser(email: $email, password: $password) {
                id
                username
              }
            }
          `,
          {
            email: email.value,
            password: password.value,
          }
        );
        userId.value = result.value.loginUser.id;
        store.commit("updateUser", result.value.loginUser);
        router.push("/homepage");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Failed to Sign In, Please try again!",
        });
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
