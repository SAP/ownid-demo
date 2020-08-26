<template>
    <div class="vue-template">
        <form>
            <h3>Sign Up</h3>

            <ownid type="register" @register="onRegister"></ownid>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    components:{
        ownid: () => import('controls/OwnId.vue')
    },
    methods: {
        onRegister(data) {
            console.log('onRegister', data);
            document.cookie = `${data.sessionInfo.cookieName}=${data.sessionInfo.cookieValue}; path=/`;
            this.$router.push('/');
        }
    },
    data() {
        return {}
    }
}
</script>