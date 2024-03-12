<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <div class="button-container-login">
        <button type="submit">Login</button>
      </div>
    </form>
    <div
      style="
        margin-top: 1rem;
        font-size: large;
        font-weight: bold;
        margin-bottom: 1rem;
      "
    >
      OR
    </div>
    <div>
      <router-link to="/signup">
        <button class="button-container-newAccount">Create an Account</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
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
