<template>

    <h1>DashboardView</h1>
    <span v-if="$store.state.user">{{ `Connecté en tant que ${$store.state.user.email}.` }}</span>
    <button @click="$store.dispatch('logout')">Déconnexion</button>
  
</template>

<script>

    export default {
        name: "DashboardView"
    }

</script>
