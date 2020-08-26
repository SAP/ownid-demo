<template>
    <div class="vue-template">
        <form>
            <h3>Sign In</h3>
            <ownid type="login" @login="onLogin"></ownid>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <!-- <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div> -->

        </form>
    </div>
</template>

<script>
export default {
    components:{
        ownid: () => import('controls/OwnId.vue')
    },
    methods: {
        onLogin(data) {
            console.log('onLogin', data);
            document.cookie = `${data.sessionInfo.cookieName}=${data.sessionInfo.cookieValue}; path=/`;
            this.$router.push('/');
        }
    },
    data() {
        return {}
    }
}
</script>