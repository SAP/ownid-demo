<template>
  <div class="container">
    <div v-if="profile" class="call-2-action">
      <h1 class="headline">Welcome {{ profile.firstName }}!</h1>
      <h2>
       <ownid v-if="!linked" type="link" @link="linked = true"></ownid>
        <b-card v-if="linked">
          You are linked
        </b-card>
      </h2>
      <h2 class="sub-title">
        Your data is:
      </h2>
      <b-card>
        <pre>{{ profile }}</pre>
      </b-card>

      <button color="primary" @click="logout()">Logout</button>
    </div>
    <div></div>
  </div>
</template>

<script>
import gigyaService from '@/services/gigya.service';

export default {
  components:{
    ownid: () => import('controls/OwnId.vue')
  },
  data() {
    return {
      profile: null,
      linked: false
    }
  },
  async created () {
    this.profile = (await gigyaService.getProfile()).profile;
  },
  methods: {
    async logout() {
      await gigyaService.logout();
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
