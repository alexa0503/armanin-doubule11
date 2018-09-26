<template>
  <v-container fluid>
    <div class="tip-invite">
      <img src="@/assets/text-index-05.png" @click="$router.replace({name:'items'})" >
      <img 
        src="@/assets/text-index-06.png" 
        class="mt-tip" 
        @click="$router.replace({name:'items'})" >
    </div>
    <div class="uri-invite"><img 
      src="@/assets/uri-02.png" 
      class="img-fluid" ></div>
  </v-container>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  created(){
  },
  methods: {
    explore(){
      this.$router.replace({name:'items'})
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
</style>
