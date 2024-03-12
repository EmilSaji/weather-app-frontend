<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="createAccount">
      <label for="email">Username:</label>
      <input
        type="name"
        id="username"
        v-model="username"
        required
        :disabled="isAccountCreated"
      />
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
        :disabled="isAccountCreated"
      />
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        :disabled="isAccountCreated"
      />
      <div
        class="button-container-login"
        v-if="isAccountCreated ? false : true"
      >
        <button type="submit">Create Account</button>
      </div>
    </form>
    <router-link to="/signin" v-if="isAccountCreated">
      <button class="button-container-newAccount">Sign In</button>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

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
      } catch (error) {
        console.error("An error occurred while creating the account:", error);
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

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

label {
  margin-bottom: 5px;
  display: block;
}

input[type="name"],
input[type="email"],
input[type="password"] {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 200px;
}

.button-container-login {
  margin-top: 10px;
  text-align: center;
}

.button-container-newAccount {
  margin-top: 10px;
  text-align: center;
  padding: 10px 20px;
  background-color: #00b3ffeb;
  color: white;
  border: none;
  cursor: pointer;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
