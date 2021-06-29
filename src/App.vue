<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Lorem Ipsum Inc.</b-navbar-brand>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <!-- <b-collapse id="nav-collapse" is-nav>
        <b-nav>
          <b-nav-item href="/cadastrar">Cadastrar</b-nav-item>
          <b-nav-item href="/editar">Editar</b-nav-item>
        </b-nav>
      </b-collapse> -->
    </b-navbar>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>
