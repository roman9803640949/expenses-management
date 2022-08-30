<template>
  <v-container>
    <v-row justify="center" class="mt-10">
      <v-col md="5">
        <v-card class="pa-5">
          <form @submit="signIp">
            <v-card-text>
              <h1 class="mb-10">Sign in to your account</h1>
              <v-text-field
                label="Email"
                outlined
                color="primary darken-4"
                type="email"
                v-model="email"
              ></v-text-field>

              <v-text-field
                label="Password"
                outlined
                color="primary darken-4"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-btn
                type="submit"
                block
                elevation="0"
                color="primary darken-4"
                large
              >
                Sign in
              </v-btn>
            </v-card-text>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    signIp(e) {
      e.preventDefault();
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
    },
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/about");
      }
    },
  },
};
</script>

<style>
</style>