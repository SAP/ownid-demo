<template>
  <div ref="ownid-container" class="ownid-container" />
</template>

<script>
/* eslint-disable no-unused-vars */

const environment = {
  ownidURLPrefix : process.env.VUE_APP_OWNID_URL_PREFIX,
  gigyaApiKey: process.env.VUE_APP_GIGYA_API_KEY
};

export default {
  props: ['type', 'data'],
  async mounted() {
    var vm = this;

    // @ts-ignore-next-line
    window.ownid.init({
      statusInterval: 1000,
      URLPrefix: environment.ownidURLPrefix
      // logger: new ConsoleLogger(),
      // logLevel: 'info'
    })

    console.log(this.type)
    if (this.type === 'link') {
      // @ts-ignore-next-line
      this.ownidWidget = await window.ownid.gigya.renderLink(
        {
          element: vm.$refs['ownid-container'],
          type: this.type,
          onLink: () => vm.$emit('link'),
        },
        environment.gigyaApiKey
      )
    } else {
      // @ts-ignore-next-line
      this.ownidWidget = window.ownid.render({
        element: vm.$el,
        type: this.type,
        data: this.data,
        onLogin: vm.$emit.bind(vm, 'login'),
        onRegister: vm.$emit.bind(vm, 'register'),
        onLink: vm.$emit.bind(vm,'link'),
        onRecover: vm.$emit.bind(vm, 'recover')
      })
    }
  }
}
</script>

<style scoped>

</style>
