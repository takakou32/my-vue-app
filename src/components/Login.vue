<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card title="Login">
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="Username" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // ここで実際の認証処理を行うべきです
      // 簡単な例として、ユーザー名が空でなければログイン成功とします
      if (this.username.trim() !== '') {
        // ユーザー名をパラメータとして渡す
        this.$router.push({ 
          name: 'main', 
          params: { username: this.username }
        });
      } else {
        alert('ユーザー名を入力してください。');
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}
input, button {
  margin: 10px 0;
  padding: 10px;
}
</style>