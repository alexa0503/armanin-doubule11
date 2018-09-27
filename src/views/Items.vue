<template>
  <v-container fluid>
    <div class="page">
      <div v-swipeleft="{fn:swipeleft,name:'左滑'}" v-swiperight="{fn:swiperight,name:'右滑'}" :class="animationClass" class="page-container">
        <div class="item-trans">
          <div class="item-trans-01">
            <div class="item"></div>
            <div class="item-text"><img :src="require(`@/assets/text-item-0${currentIndex}.png`)"></div>
            <div class="star-frames"><canvas id="frames"></canvas></div>
          </div>
        </div>
        <div class="item-clicks">
          <div><img src="@/assets/icon-comment.png" @click="$router.replace({name:'list',params:{id:currentIndex}})"></div>
          <div><img @click="showDetail" src="@/assets/icon-heart.png"></div>
        </div>
        <div class="item-selects">
          <div class="item-selects-container">
            <div v-for="(item,index) in itemSelects" :key="index" class="item-select"></div>
          </div>
        </div>
        <!-- <div class="item-dots">
          <i v-for="(item,index) in itemDots" :key="index" :class="item" />
        </div> -->
      </div>
    </div>
    <div v-if="detailSeen" class="item-detail">
      <div class="item-detail-container">
        <div class="item-detail-img">
          <img :src="itemImg">
        </div>
        <div class="item-detail-title"><img :src="itemTitle" class="mb-2"><img src="@/assets/text-item-detail.png" class="mt-2"></div>
        <div class="item-detail-buttons">
          <img src="@/assets/btn-photo.png" @click="$router.replace({name:'photo'})">
          <img src="@/assets/btn-reason.png" @click="$router.replace({name:'list',params:{id:currentIndex}})">
        </div>
        <div class="star-frames"><canvas id="detail-frames"></canvas></div>
      </div>
      <div class="item-detail-close" @click="detailSeen = false"><img src="@/assets/icon-close-02.png" class="img-fluid"></div>
    </div>
    <div class="animation-imgs">
      <div v-for="(item,index) in itemSelects" :key="index"><img :src="item.img"></div>
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
  import {
    TweenLite,
    Circ
  } from "gsap/TweenMax";
  export default {
    name: "App",
    data() {
      return {
        animationClass: null,
        detailSeen: false,
        hasCompleted: true,
        time: 0.6
      };
    },
    computed: {
      ...mapGetters({
        currentIndex: "itemId",
        imgs: "frameImgs"
      }),
      itemImg: function() {
        let i = this.currentIndex;
        return require(`@/assets/item-0${i}.png`);
      },
      itemText: function() {
        let i = this.currentIndex;
        return require(`@/assets/text-item-0${i}.png`);
      },
      itemTitle: function() {
        let i = this.currentIndex;
        return require(`@/assets/title-item-detail-0${i}.png`);
      },
      itemSelects: function() {
        let arr = [];
        for (let i = 1; i < 6; i++) {
          arr.push({
            img: require(`@/assets/item-0${i}.png`)
          })
        }
        return arr;
      },
      itemDots: function() {
        let i = this.currentIndex;
        let arr = [];
        for (let n = 1; n <= 5; n++) {
          if (i == n) {
            arr.push('actived');
          } else {
            arr.push('');
          }
        }
        return arr;
      }
    },
    created() {},
    mounted() {
      this.slide(false)
      let imgs = this.imgs
      let id = "frames"
      let width = width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      width = 300;
      let height = width
      drawFrames({
        id,
        width,
        height,
        imgs
      })
    },
    methods: {
      showDetail() {
        this.detailSeen = true;
        let id = 'detail-frames'
        let imgs = this.imgs
        let width = width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        width = 300;
        let height = width
        setTimeout(() => {
          drawFrames({
            id,
            width,
            height,
            imgs
          })
        }, 50)
      },
      swipeleft() {
        this.slide(false)
      },
      swiperight() {
        this.slide(true)
      },
      slide(toRight = true) {
        let vm = this
        if (!vm.hasCompleted) {
          return;
        }
        let nextId
        if (toRight) {
          nextId = this.currentIndex - 1;
          if (nextId < 1) {
            nextId = 5;
          }
        } else {
          nextId = this.currentIndex + 1;
          if (nextId > 5) {
            nextId = 1;
          }
        }
        this.$store.dispatch('chooseItem', nextId)
        let container = document.querySelector('.animation-imgs')
        let nodes = container.childNodes
        for (let i = 0; i < nodes.length; i++) {
          if ((nextId == i + 1 && toRight) || (!toRight && nextId == i + 1)) {
            let bezierPath = [{
              x: 150,
              y: 200
            }, {
              x: 0,
              y: 0
            }]
            if (!toRight) {
              bezierPath = [{
                x: -150,
                y: 200
              }, {
                x: 0,
                y: 0
              }]
            }
            TweenLite.to(nodes[i].childNodes[0], this.time, {
              bezier: bezierPath,
              values: true,
              scale: 1
            })
          } else {
            let params, x, y
            x = (i + 5 - nextId) % 5 * 80 - 120;
            if (nextId - i == 3 || nextId - i == 4 || nextId - i == -1 || nextId - i == -2) {
              y = 370;
            } else {
              y = 330;
            }
            if (((i + 5 - nextId) % 5 == 3 && !toRight) || (toRight && (i + 5 - nextId) % 5 == 0)) {
              let bezierPath = [{
                x: 150,
                y: 300
              }, {
                x: x,
                y: y
              }]
              if (toRight) {
                bezierPath = [{
                  x: -150,
                  y: 300
                }, {
                  x: x,
                  y: y
                }]
              }
              params = {
                bezier: bezierPath,
                values: true,
                scale: 0.26
              }
            } else {
              params = {
                scale: 0.26,
                x: x,
                y: y
              }
            }
            params.onComplete = function() {
              vm.hasCompleted = true
            }
            TweenLite.to(nodes[i].childNodes[0], this.time, params);
          }
        }
      }
    }
  };
</script>
<style scoped>
  #itemFrames {
    position: fixed;
    top: 0;
    left: 0;
  }
  .page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    overflow-x: hidden;
  }
  .item-trans {
    height: 36rem;
  }
  .item-trans-01 {
    background: url('../assets/star.png') center 0 no-repeat;
    background-size: 300px auto;
    position: relative;
  }
  .star-frames {
    position: absolute;
    top: 1px;
    left: 6px;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: -1;
  }
  .item-detail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 210;
    background: #95000c url("../assets/bkg.jpg") 0 center no-repeat;
  }
  .item-detail-container {
    width: 100%;
    height: 100%;
    background: url('../assets/star.png') center 0 no-repeat;
    background-size: 300px auto;
    position: relative;
  }
  .item-detail-container .star-frames {
    margin-top: 0;
  }
  .item-detail-img {
    margin: 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-detail-img img {
    width: 250px;
    margin: 25px 0 20px;
  }
  .item-detail-title {
    margin: 0rem auto 0;
    width: 24rem;
    height: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .item-detail-title img {
    width: 100%;
  }
  .item-detail-buttons {
    margin: 0rem auto 0;
    width: 24rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
  .item-detail-buttons img {
    width: 10.6rem;
  }
  .item-detail-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.25rem;
    height: 2.25rem;
    margin: 2rem;
    z-index: 8;
  }
  .page-container {
    width: 100%;
    height: 100%;
    transform: translate(0, 0);
  }
  .page-animation-left {
    animation: swipeleft .5s ease-in;
  }
  .page-animation-right {
    animation: swiperight .5s ease-in;
  }
  @keyframes swipeleft {
    0% {
      transform: translate(0, 0);
    }
    30% {
      transform: translate(-50rem, 0);
    }
    31% {
      transform: translate(50rem, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  @keyframes swiperight {
    0% {
      transform: translate(0, 0);
    }
    30% {
      transform: translate(50rem, 0);
    }
    31% {
      transform: translate(-50rem, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  .item {
    margin: 0rem auto 0;
    padding-top: 0rem;
    width: 20rem;
    height: 27.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item img {
    width: 100%;
  }
  .item-text {
    margin: 2rem auto 0;
    width: 23rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
  }
  .item-text img {
    width: 100%;
  }
  .item-clicks {
    margin: 0rem auto 0;
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
  }
  .item-clicks img {
    width: 5rem;
  }
  .item-selects {
    margin: 0 auto 0;
    width: 320px;
    height: 11rem;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
  }
  .item-selects-container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    height: 110px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  .item-selects .item-select {
    height: 7rem;
    background: url('../assets/bkg-star.png') center 0 no-repeat;
    background-size: 7rem auto;
    width: 80px;
    text-align: center;
    height: 110px;
  }
  .item-selects .item-select:nth-child(2),
  .item-selects .item-select:nth-child(3) {
    background-position-y: 40px;
  }
  .item-dots {
    margin: 2rem auto 0;
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
  }
  .item-dots i {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background: #FFF;
  }
  .item-dots i.actived {
    background: #610b0b;
  }
  .animation-imgs {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    right: 0;
  }
  .animation-imgs div {
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -125px;
    margin-top: 25px;
  }
  .animation-imgs img {
    width: 250px;
  }
</style>
