<template>
  <v-container fluid justify-center column fill-height v-swipeup="{fn:swipeup,name:'上划'}">
    <div class="uri-invite">
      <img src="@/assets/uri-02.png" class="img-fluid">
      <div class="tip-invite">
      </div>
      <div class="tip-invite-button">
        <img src="@/assets/button-invite-01.png" width="102" @touchend="$router.push({name:'item',params:{id:1}})">
      </div>
    </div>
    <div class="arrow-down">
      <img class="icon-arrow" src="@/assets/icon-arrow-down.png" @touchend="$router.push({name:'item',params:{id:1}})">
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
          name: 'item',
          params: {
            id: 1
          }
        })
      }
    }
  };
</script>
<style scoped>
  .uri-invite {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
  .tip-invite {
    position: absolute;
    top: -10px;
    right: 0;
    width: 250px;
    height: 200px;
    margin: 0 20px 0 0;
    background: url("../assets/tip-02.png") 0 0 no-repeat;
    background-size: 250px auto;
    text-align: center;
    z-index: -1;
  }
  .tip-invite-button {
    position: absolute;
    top: 85px;
    right: 92px;
  }
  .arrow-down {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding-bottom: 0rem;
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
  @media screen and (min-height:650px) {
    .tip-invite {
      top: -50px;
    }
    .tip-invite-button {
      top: 45px;
      right: 92px;
    }
  }
</style>
