<template>

    <h1>SignupView</h1>

    <form @submit.prevent="register">

        <h2>Inscription</h2>

        <fieldset>
            <label for="email">Email</label>
            <input name="email" type="email" v-model="form.email" autocomplete="email" required placeholder="ex. test@test.com">
        </fieldset>

        <fieldset>
            <label for="password">Mot de passe</label>
            <input name="password" type="password" v-model="form.password" autocomplete="new-password" required placeholder="ex. test123">
        </fieldset>

        <input type="submit" value="Inscription">

        <span v-if="error">{{error}}</span>

    </form>

</template>

<script>

    export default {
        name: "SignupView",
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
            register() {
                this.$store.dispatch('register', this.form)
                .then((res) => { if(res) this.error = res })
            }
        }
    }

</script>