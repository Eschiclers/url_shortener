<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <Navbar />
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
