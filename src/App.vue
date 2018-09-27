<template>
  <v-app>
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        transitionName: ''
      };
    },
    watch: {
      '$route' (to, from) {
        if (to.name == 'invite' && from.name == 'home') {
          this.transitionName = 'swipe'
        } else if (to.name == 'items' && from.name == 'invite') {
          this.transitionName = 'swipe'
        } else {
          this.transitionName = ''
        }
      }
    },
    created() {
      let imgs = new Array();
      for (let index = 0; index <= 73; index++) {
        if (index < 10) {
          imgs.push(require(`@/assets/frames/banner2v2000${index}.png`));
        } else {
          imgs.push(require(`@/assets/frames/banner2v200${index}.png`));
        }
      }
      // this.imgs = imgs;
      this.$store.dispatch('initFrames', imgs)
      let len = imgs.length;
      for (let i = 0; i < len; i++) {
        let imgObj = new Image(); // 创建图片对象
        imgObj.src = imgs[i];
        imgObj.addEventListener(
          "load",
          function() {
            // console.log("imgs" + i + "加载完毕");
          },
          false
        )
      }
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
  /* body {
          font-size: 65% !important;
        } */
  .container {
    padding: 0!important;
    position: relative;
    width: 100%;
    height: 100%;
    transform: translate(0, 0);
  }
  .img-fluid {
    width: 100%;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    position: relative;
    background: #95000c url("assets/bkg.jpg") 0 center no-repeat;
    background-size: 100% auto;
    overflow: auto;
    overflow-x: hidden;
    max-width: 450px;
  }
  .swipe-enter-active {
    /* transition: opacity .5s; */
    animation: enter .6s ease-in;
  }
  .swipe-leave-active {
    animation: out .3s ease-out;
  }
  @keyframes enter {
    0% {
      transform: translate(0, 100rem);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  @keyframes out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, -100rem);
    }
  }
  .rr-enter-active {
    animation: "rotating-in" .6s ease-in;
  }
  .rr-leave-active {
    animation: "rotating-out" .1s ease-out;
  }
  @keyframes rotating-in {
    0% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
  @keyframes rotating-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
