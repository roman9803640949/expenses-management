<template>
  <div id="app">
    <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>Fund Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
          <v-btn color="dark" class="ml-1" to="/about">
            Categories
          </v-btn>
          <v-btn color="dark" class="ml-1">
            Report Page
          </v-btn>
          <v-btn color="dark" class="ml-1">
            Logout
          </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
    </v-app>
  </div>
</template>

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
