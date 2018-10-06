<template>
  <v-app>
    <v-content>
      <transition :name="transitionName">
        <router-view/>
      </transition>
    </v-content>
    <div class="logo" v-if="showLogo"><img src="@/assets/logo-01.png" width="98" /></div>
    <div class="loading" v-if="loading">
      <v-progress-circular :width="5" color="red" :size="70" indeterminate></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "App",
    data() {
      return {
        transitionName: ''
      };
    },
    computed: {
      ...mapGetters({
        loading: "loading",
        showLogo: "showLogo"
      })
    },
    watch: {
      '$route' (to, from) {
        if (to.name == 'invite' && from.name == 'home') {
          this.transitionName = 'swipe'
        } else if (to.name == 'item' && from.name == 'invite') {
          this.transitionName = 'swipe'
        } else if (to.name == 'buy' && from.name == 'item') {
          this.transitionName = 'swipe'
        } else {
          this.transitionName = ''
        }
        if (to.name == 'photo' || to.name == 'result' || to.name == 'buy') {
          this.$store.commit('showLogo', false)
        } else {
          this.$store.commit('showLogo', true)
        }
      }
    },
    created() {
      // let imgs = new Array();
      // for (let index = 0; index <= 73; index++) {
      //   if (index < 10) {
      //     imgs.push(require(`@/assets/frames/banner2v2000${index}.png`));
      //   } else {
      //     imgs.push(require(`@/assets/frames/banner2v200${index}.png`));
      //   }
      // }
      // this.$store.dispatch('initFrames', imgs)
      // let len = imgs.length;
      // for (let i = 0; i < len; i++) {
      //   let imgObj = new Image(); // 创建图片对象
      //   imgObj.src = imgs[i];
      //   imgObj.addEventListener(
      //     "load",
      //     function() {
      //       // console.log("imgs" + i + "加载完毕");
      //     },
      //     false
      //   )
      // }
    },
    mounted() {
      var overscroll = function(el) {
        el.addEventListener('touchstart', function() {
          var top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight;
          if (top === 0) {
            el.scrollTop = 1;
          } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1;
          }
        }, {
          passive: false
        });
        el.addEventListener('touchmove', function(evt) {
          if (el.offsetHeight < el.scrollHeight) {
            evt._isScroller = true;
          }
        }, {
          passive: false
        });
      }
      overscroll(document.querySelector('#app'));
      document.addEventListener('touchmove', function(evt) {
        if (!evt._isScroller) {
          evt.preventDefault();
        }
      }, {
        passive: false
      });
    }
  };
</script>

<style>
  .logo {
    position: fixed;
    top: 20px;
    left: 20px;
  }
  .relative {
    position: relative!important;
  }
  .container {
    padding: 0!important;
  }
  .img-fluid {
    width: 100%;
  }
  .loading {
    text-align: center;
    position: fixed;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .swipe-enter-active,
  .swipe-leave-active {
    transition: all 300ms ease-in-out;
    position: absolute;
  }
  .swipe-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .swipe-leave-active {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .slide-left-enter-active {
    animation-name: "slide-left-in";
    animation-duration: .5s;
  }
  .slide-left-leave-active {
    animation-name: "slide-left-out";
    animation-duration: .5s;
  }
  .slide-right-enter-active {
    animation-name: "slide-right-in";
    animation-duration: .5s;
  }
  .slide-right-leave-active {
    animation-name: "slide-right-out";
    animation-duration: .5s;
  }
  @keyframes slide-left-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slide-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
  @keyframes slide-right-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slide-right-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
