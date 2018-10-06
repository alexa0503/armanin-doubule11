<template>
  <v-container v-swipeleft="{fn:swipeleft,name:'左滑'}" v-swiperight="{fn:swiperight,name:'右滑'}" align-center justify-start column fluid>
    <transition :name="transitionName">
      <div v-if="show">
        <div class="item">
          <img :src="itemImg" width="280" />
          <div class="arrowLeft"><img @touchend="swiperight" height="55" src="@/assets/arrow-left.png" /></div>
          <div class="arrowRight"><img height="55" src="@/assets/arrow-right.png" @touchend="swipeleft" /></div>
        </div>
        <div class="itemText">
          <img :src="itemText" width="250" />
        </div>
        <div class="itemBorder">
          <img src="@/assets/border-01.png" width="256" />
        </div>
        <div class="itemDesc">
          <img :src="itemDesc" width="250" />
        </div>
        <div class="itemButtons">
          <img @touchend="pickFile" src="@/assets/button-item-01.png" width="133" />
          <img @touchend="$router.push({name:'buy',params:{id:id}})" src="@/assets/button-item-02.png" width="133" />
          <input ref="image" type="file" style="display: none" accept="image/*" @change="onFilePicked($event)">
        </div>
      </div>
    </transition>
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
        id: 1,
        show: true,
        transitionName: ''
      };
    },
    computed: {
      itemImg: function() {
        let id = this.id;
        return require(`@/assets/item-0${id}.png`);
      },
      itemText: function() {
        let id = this.id;
        return require(`@/assets/text-item-0${id}.png`);
      },
      itemDesc: function() {
        let id = this.id;
        return require(`@/assets/item-desc-0${id}.png`);
      }
    },
    mounted() {},
    created() {
      let id = parseInt(this.$router.history.current.params.id)
      if (!id || id < 1 || id > 5) {
        this.id = 1
      } else {
        this.id = id
      }
      this.$store.dispatch('chooseItem', this.id)
    },
    watch: {
      '$route': function(to, from) {
        setTimeout(() => {
          this.show = false
        }, 1);
        setTimeout(() => {
          this.show = true
        }, 100);
        setTimeout(() => {
          this.id = this.$route.params.id
          this.$store.dispatch('chooseItem', this.id)
        }, 150);
      }
    },
    methods: {
      swiperight() {
        let id = this.id
        let nextId
        if (id > 1) {
          nextId = id - 1
          // this.show = false
          // setTimeout(() => {
          //   this.show = true
          // }, 300);
        } else {
          nextId = 5
        }
        this.transitionName = 'slide-left'
        this.$router.push({
          name: 'item',
          params: {
            id: nextId
          }
        })
      },
      swipeleft() {
        let id = this.id
        let nextId
        if (id < 5) {
          nextId = id + 1
        }
        else{
          nextId = 1
        }
        this.transitionName = 'slide-right'
        this.$router.push({
            name: 'item',
            params: {
              id: nextId
            }
          })
      },
      pickFile() {
        this.$refs["image"].click();
      },
      onFilePicked(e) {
        let files = e.target.files;
        this.$store.dispatch("filePicked", files);
        this.$router.push({
          name: 'photo'
        })
      }
    }
  };
</script>
<style scoped>
  .item {
    background: url('../assets/star.png') 0 0 no-repeat;
    background-size: 100% auto;
    width: 300px;
    margin: 70px auto 0;
    height: 280px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .arrowLeft,
  .arrowRight {
    position: absolute;
    top: 160px;
  }
  .arrowLeft {
    left: -10px;
  }
  .arrowRight {
    right: -10px;
  }
  .itemText {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 54px;
  }
  .itemBorder {
    height: 2px;
    line-height: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 12px 0;
  }
  .itemDesc {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 75px;
  }
  .itemButtons {
    margin: 15px auto 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 280px;
    height: 33px;
  }
</style>
