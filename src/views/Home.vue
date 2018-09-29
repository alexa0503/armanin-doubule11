<template>
  <v-container v-swipeup="{fn:swipeup,name:'上划'}" fluid>
    <div class="tip">
      <img width="232" @click="introSeen = true" src="@/assets/text-index-02.png" class="tip-text">
      <div class="tip-hand"><img src="@/assets/icon-hand.png" width="27" /></div>
      <!-- <div class="tip-close">
                  <img src="@/assets/icon-close-01.png" />
                </div> -->
    </div>
    <div class="star">
      <img src="@/assets/star.png">
      <div class="star-frames"><canvas id="frames"></canvas></div>
    </div>
    <div class="uri">
      <img src="@/assets/uri-01.png">
    </div>
    <div v-if="introSeen" class="intro">
      <img src="@/assets/text-index-03.png" class="mb-intro">
      <img src="@/assets/text-index-04.png">
      <div class="intro-close" @click="introSeen = false"><img src="@/assets/icon-close-02.png"></div>
    </div>
    <div v-if="!introSeen" class="arrow-down">
      <img class="icon-arrow" src="@/assets/icon-arrow-down.png" @click="$router.push({name:'invite'})">
    </div>
  </v-container>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import {
    drawFrames
  } from "../utils/frames"
  export default {
    name: "App",
    data() {
      return {
        introSeen: false
      };
    },
    computed: {
      ...mapGetters({
        imgs: "frameImgs"
      })
    },
    watch: {
      '$route' (to, from) {
        this.drawFrames()
      },
    },
    mounted() {
      this.drawFrames()
      // this.$store.dispatch('loading', true)
      // TweenLite.to(obj, 1, {y: 10,repeat:-1, yoyo:true})
    },
    methods: {
      drawFrames() {
        let imgs = this.imgs
        let id = "frames"
        let width = width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let height = width
        drawFrames({
          id,
          width,
          height,
          imgs
        })
      },
      swipeup() {
        if (!this.introSeen) {
          this.$router.push({
            name: 'invite'
          })
        }
      },
      // invite() {
      //   this.$router.push({name:"invite"})
      // }
    }
  };
</script>
<style scoped>
  .mb-intro {
    margin-bottom: 7.6rem;
  }
  .star,
  .intro,
  .uri {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .star {
    margin-top: 11rem;
    position: relative;
  }
  .star .star-frames {
    position: absolute;
    top: 1px;
    left: 2px;
    right: 0;
    bottom: 0;
  }
  .uri {
    margin-top: 18rem;
    z-index: 2;
  }
  .intro {
    background: rgba(179, 0, 23, 0.85);
    z-index: 4;
    padding: 10rem 0 0;
  }
  .arrow-down {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding-bottom: 3rem;
    z-index: 5;
    animation: updown1 .6s infinite alternate;
  }
  .arrow-down img {
    width: 5.4rem;
  }
  @keyframes updown1 {
    from {
      bottom: 4px;
    }
    to {
      bottom: 20px;
    }
  }
  .intro img {
    width: 100%;
  }
  .intro-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2.25rem;
    height: 2.25rem;
  }
  .intro-close img {
    width: 100%;
  }
  .tip {
    position: absolute;
    top: 0;
    right: 0;
    width: 26rem;
    height: 16rem;
    margin: 2rem 2rem 0 0;
    background: url("../assets/tip-index-01.png") 0 0 no-repeat;
    background-size: 26rem auto;
    z-index: 3;
    text-align: center;
  }
  .tip .tip-hand {
    position: absolute;
    right: 7rem;
    top: 1.5rem;
    animation: rightleft .6s infinite alternate;
  }
  @keyframes rightleft {
    from {
      right: 7.5rem;
    }
    to {
      right: 6.5rem;
    }
  }
  .tip .tip-text {
    width: 20.8rem;
    margin: 2rem 0 0;
  }
  .tip .tip-title {
    position: absolute;
    top: 0;
    left: 0;
    margin: 2rem 0 0 11rem;
  }
  .tip .tip-close {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    width: 2rem;
  }
  .tip .tip-close img {
    width: 100%;
  }
  .star img {
    width: 100%;
  }
  .uri img {
    width: 64%;
  }
</style>
