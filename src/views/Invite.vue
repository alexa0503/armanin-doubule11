<template>
  <v-container fluid v-swipeup="{fn:swipeup,name:'上划'}">
    <div class="tip-invite">
      <img src="@/assets/text-index-05.png" @click="$router.replace({name:'items'})">
      <img src="@/assets/text-index-06.png" class="mt-tip" @click="$router.replace({name:'items'})">
    </div>
    <div class="uri-invite"><img src="@/assets/uri-02.png" class="img-fluid"></div>
    <div class="arrow-down">
      <img class="icon-arrow" src="@/assets/icon-arrow-down.png" @click="$router.replace({name:'invite'})">
    </div>
  </v-container>
</template>
<script>

  import {
    TweenLite,
    TweenMax,
    Circ
  } from "gsap/TweenMax";
  export default {
    name: "App",
    data() {
      return {};
    },
    created() {},
    mounted(){
      const obj = document.querySelector('.icon-arrow')
      TweenMax.to(".icon-arrow", 0.5, {
				y: "10px",
				repeat: -1,
				yoyo: true,
				// onRepeat: onRepeat,
				repeatDelay: 0,
				ease: Linear.easeNone
			});
    },
    methods: {
      swipeup() {
        this.$router.replace({
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
    bottom: 0;
    right: 0;
    z-index: 10;
  }
  .tip-invite {
    position: absolute;
    top: 0;
    right: 0;
    width: 26rem;
    height: 16rem;
    margin: 2rem 2rem 0 0;
    background: url("../assets/tip-01.png") 0 0 no-repeat;
    background-size: 26rem auto;
    z-index: 99;
    text-align: center;
    padding-top: 1.8rem;
  }
  .tip-invite img {
    width: 21rem;
  }
  .mt-tip {
    margin-top: 1rem;
  }
  .arrow-down {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding-bottom: 3rem;
    z-index: 20;
  }
  .arrow-down img {
    width: 5.4rem;
  }
</style>
