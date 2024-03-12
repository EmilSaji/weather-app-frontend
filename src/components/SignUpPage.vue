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
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isAccountCreated: false,
    };
  },
  methods: {
    createAccount() {
      this.isAccountCreated = true;
      console.log("Logging in...", this.email, this.password);
    },
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
