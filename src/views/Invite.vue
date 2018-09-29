<template>
  <v-container fluid v-swipeup="{fn:swipeup,name:'上划'}">
    <div class="uri-invite"><img src="@/assets/uri-02.png" class="img-fluid">
      <div class="tip-invite">
        <img src="@/assets/button-invite-01.png" width="102" class="mt-tip" @click="$router.push({name:'items'})">
      </div>
    </div>
    <div class="arrow-down">
      <img class="icon-arrow" src="@/assets/icon-arrow-down.png" @click="$router.push({name:'invite'})">
    </div>
  </v-container>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {};
    },
    created() {},
    mounted() {},
    methods: {
      swipeup() {
        this.$router.push({
          name: 'items'
        })
      }
    }
  };
</script>
<style scoped>
  .uri-invite {
    position: absolute;
    left: 0;
    bottom: -2px;
    right: 0;
    z-index: 10;
  }
  .tip-invite {
    position: absolute;
    top: -5rem;
    right: 0.5rem;
    width: 25rem;
    height: 16rem;
    margin: 0 0 0 0;
    background: url("../assets/tip-02.png") 0 0 no-repeat;
    background-size: 25rem auto;
    z-index: 99;
    text-align: center;
    padding-top: 1.8rem;
  }
  .mt-tip {
    margin-top: 6.3rem;
  }
  .arrow-down {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding-bottom: 3rem;
    z-index: 20;
    animation: updown2 .6s infinite alternate;
  }
  @keyframes updown2 {
    from {
      bottom: 4px;
    }
    to {
      bottom: 20px;
    }
  }
  .arrow-down img {
    width: 5.4rem;
  }
</style>
