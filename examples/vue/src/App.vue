<template>
  <div class="vue-template">
    <!-- Navigation -->
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="https://www.ownid.io" target="_blank">OwnID</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item active-class="active" exact to="signup">Sign up</b-nav-item>
        <b-nav-item active-class="active" to="login">Sign in</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>