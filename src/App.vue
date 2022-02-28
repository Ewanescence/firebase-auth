<template>

  <div v-if="$store.state.fetched">
    <nav>
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
          |
        </li>
        <li v-if="$store.state.user">
          <router-link to="/dashboard">Interface</router-link>
        </li>
        <li v-if="!$store.state.user">
          <router-link to="/login">Connexion</router-link>
          |
        </li>
        <li v-if="!$store.state.user">
          <router-link to="/signup">Inscription</router-link>
        </li>
      </ul>
    </nav>

    <main>
      <router-view />
    </main>

  </div>

</template>

<script>

  export default {
    Name: "App",
    created() {
      // Tries to get a user and initialize it 
      this.$store.dispatch('fetchUser')
    }
  }

</script>

<style>

  /* CSS VARIABLES */

  :root {
    --color-black:  #141212;
    --color-blackish: #201c1d;
    --color-light: #f1f1f1;
    --color-green: #42b983;
    --color-red: #ca1e1e;
  }

  /* INITIAL CSS RULES */
  
  * {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    list-style: none;
    font-family: 'Sora', sans-serif;
    box-sizing: border-box;
    text-decoration: none;
  }

  /* CSS RULES */

  html, body, #app {
    max-width: 100vw;
    max-height: 100vh;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #app {
    background-color: var(--color-black);
    color: var(--color-light);
    display: grid;
    grid-template-rows: auto 1fr;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  nav {
    background-color: var(--color-blackish);
    padding: 30px;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 0.5rem;
  }

  a {
    margin: 0 0.5rem;
    font-weight: bold;
    color: var(--color-light);
  }

  a.router-link-exact-active {
    color: #42b983;
    cursor: default;
  }

  main {
    padding: 1rem;
    row-gap: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
  }

  input[type=email],
  input[type=password] {
    padding: 0.25rem;
    border-radius: 4px;
  }
  
  input[type=submit],
  button {
    padding: 0.5rem;
    border-radius: 4px;
    background-color: var(--color-green);
    color: var(--color-light);
    cursor: pointer;
    font-weight: bold;
    transition: 0.25s;
  }

  input[type=submit]:hover,
  button:hover {
    text-decoration: underline var(--color-light);
  }

  form > span {
    padding: 0.5rem;
    background-color: var(--color-red);
    border-radius: 4px;
  }


</style>
