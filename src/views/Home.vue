<template>
  <v-container justify-center column fill-height v-swipeup="{fn:swipeup,name:'上划'}" fluid>
    <v-flex relative xs12>
      <div class="star">
        <img src="@/assets/star.png" class="star-img img-fluid">
        <div class="star-frames"><canvas id="frames"></canvas></div>
        <div class="uri">
          <img src="@/assets/uri-01.png" width="240">
        </div>
        <div class="tip">
          <img width="232" @touchend="introSeen = true" src="@/assets/text-index-02.png" class="tip-text">
          <!-- <div class="tip-hand"><img src="@/assets/icon-hand.png" width="27" /></div> -->
          <!-- <div class="tip-close">
                  <img src="@/assets/icon-close-01.png" />
                </div> -->
        </div>
      </div>
      <div class="arrow-down">
        <img v-if="!introSeen" class="icon-arrow" src="@/assets/icon-arrow-down.png" @touchend="$router.push({name:'invite'})">
      </div>
    </v-flex>
    <div v-if="introSeen" class="intro">
      <img src="@/assets/text-index-03.png" class="mb-intro">
      <img src="@/assets/text-index-04.png">
      <div class="intro-close" @touchend="introSeen = false"><img src="@/assets/icon-close-02.png"></div>
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
  .uri,
  .intro {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .star {
    position: relative;
    padding-top: 8rem;
  }
  .star .star-img {
    margin-top: -8rem;
  }
  .star .star-frames {
    position: absolute;
    top: 1px;
    left: 2px;
    right: 0;
    bottom: 0;
  }
  .uri {
    margin-top: 10rem;
  }
  .intro {
    background: rgba(179, 0, 23, 0.85);
    z-index: 4;
    padding: 10rem 0 0;
  }
  .arrow-down {
    position: relative;
    text-align: center;
    padding-top: 6rem;
    height: 4rem;
  }
  @media screen and (min-height:600px) {
    .arrow-down {
      padding-top: 8rem;
    }
  }
  @media screen and (min-height:640px) {
    .arrow-down {
      padding-top: 14rem;
    }
  }
  .arrow-down img {
    width: 5.4rem;
    z-index: 5;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -2.7rem;
    animation: updown1 .6s infinite alternate;
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
    top: -4rem;
    right: 2rem;
    width: 26rem;
    height: 16rem;
    margin: 0 1rem 0 0;
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
</style>
