<template>
  <div id="app">
    <v-app>
      <v-app-bar app dark>
        <v-toolbar-title>Fund Tracker</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="dark"
          class="ml-1"
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
        >
          {{ item.name }}
        </v-btn>

        <v-btn
          color="dark"
          class="ml-1"
          v-if="userIsAuthenticated"
          @click="logout"
        >
          Logout
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "APP",
  data() {
    return {};
  },

  computed: {
    menuItems() {
      let menuItems = [
        {
          name: "Sign up",
          to: "/signup",
        },
        {
          name: "Sign in ",
          to: "/signin",
        },
      ];

      if (this.userIsAuthenticated) {
        menuItems = [{ name: "Category", to: "/about" }];
      }
      return menuItems;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/signin");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
