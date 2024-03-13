<template>
  <div class="flex flex-col items-center p-5">
    <h1 class="text-2xl font-bold mb-5">Login</h1>
    <form @submit.prevent="createAccount" class="w-full max-w-xs">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2"
        >Username:</label
      >
      <input
        type="name"
        id="username"
        v-model="username"
        required
        :disabled="isAccountCreated"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
      />
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
        >Email:</label
      >
      <input
        type="email"
        id="email"
        v-model="email"
        required
        :disabled="isAccountCreated"
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
        :disabled="isAccountCreated"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
      />
      <div class="text-center mt-3" v-if="isAccountCreated ? false : true">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Account
        </button>
      </div>
    </form>
    <router-link to="/signin" v-if="isAccountCreated">
      <button
        class="mt-3 text-center py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
      >
        Go to Sign In
      </button>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Swal from "sweetalert2";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const isAccountCreated = ref(false);

    const ADD_USER = gql`
      mutation addUser(
        $username: String!
        $password: String!
        $email: String!
        $created_at: String!
      ) {
        addUser(
          username: $username
          password: $password
          email: $email
          created_at: $created_at
        ) {
          id
          username
          email
        }
      }
    `;

    const { mutate: addUser } = useMutation(ADD_USER);

    const createAccount = async () => {
      try {
        isAccountCreated.value = true;
        await addUser({
          username: username.value,
          password: password.value,
          email: email.value,
          created_at: new Date().toISOString(),
        });
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Account Created Successfully",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Failed to create Account",
        });
        isAccountCreated.value = false;
      }
    };

    return {
      username,
      email,
      password,
      isAccountCreated,
      createAccount,
    };
  },
};
</script>
