<template>

    <h1>LoginView</h1>

    <form @submit.prevent="login">

        <h2>Connexion</h2>

        <fieldset>
            <label for="email">Email</label>
            <input name="email" type="email" v-model="form.email" autocomplete="email" placeholder="ex. test@test.com" required>
        </fieldset>

        <fieldset>
            <label for="password">Mot de passe</label>
            <input name="password" type="password" v-model="form.password" autocomplete="current-password" placeholder="ex. test123" required>
        </fieldset>

        <input type="submit" value="Connexion">

        <span v-if="error">{{ error }}</span>

    </form>
  
</template>

<script>
  
    export default {
        name: "LoginView",
        data() {
            return {
                error: "",
                form: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.form) // Calls login action from our store...
                .then((res) => { if(res) this.error = res }) // ... and get error is the action returns one
            }
        }
    }

</script>