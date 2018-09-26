<template>
  <v-container fluid>
    <div 
      v-if="!photoed" 
      class="photo-tip">
      <img 
        :src="textImg" 
        class="photo-text-img" >
      <img 
        src="@/assets/title-photo.png" 
        class="photo-title-img" 
        @click="pickFile" >
      <input 
        ref="image" 
        type="file" 
        style="display: none" 
        accept="image/*" 
        @change="onFilePicked($event)" >
    </div>
    <div 
      v-if="!photoed" 
      class="photo-uri"><img 
        src="@/assets/uri-03.png" 
        class="img-fluid" ></div>
    <div 
      v-if="photoed" 
      class="photo-image">
      <vueCropper 
        ref="cropper" 
        :class="filterClass"
        :img="image" 
        :output-size="option.size" 
        :output-type="option.outputType"
        :info="false" 
        :full="option.full" 
        :can-move="option.canMove" 
        :can-move-box="option.canMoveBox"
        :original="option.original" 
        :auto-crop="option.autoCrop" 
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight" 
        :fixed-box="option.fixedBox" 
        :center-box = "option.centerBox"
        :max-img-size = "maxImgSize || option.maxImgSize"
        :fixed="false" 
        :high="true" 
        @realTime="realTime"
        @imgLoad="imgLoad"/>
            
      <div class="photo-star"><img 
        src="@/assets/button-star.png" 
        width="110" 
        @click="upload" ></div>
      <div class="photo-choose">
        <div class="photo-preview"><img 
          :src="preview.url" 
          :style="preview.style" 
          class="filter-01" 
          @click="filterClass = 'filter-01'" ><div 
            v-if="filterClass == 'filter-01'" 
            class="photo-choosed"><img 
              src="@/assets/icon-choosed.png" 
              width="20" ></div></div>
        <div class="photo-preview"><img 
          :src="preview.url" 
          :style="preview.style" 
          class="filter-02" 
          @click="filterClass = 'filter-02'" ><div 
            v-if="filterClass == 'filter-02'" 
            class="photo-choosed"><img width="20" src="@/assets/icon-choosed.png" ></div></div>
      </div>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import VueCropper from "../plugins/vue-cropper";

export default {
    name: "App",
    components: {
        VueCropper
    },
    data() {
        return {
            photoed: false,
            preview: {},
            canvas: null,
            filterClass: 'filter-01',
            option: {
                maxImgSize: 2000,
                size: 1,
                full: true,
                outputSize: 1,
                outputType: "png",
                canMove: true,
                canMoveBox: false,
                original: true,
                autoCrop: true,
                autoCropWidth: 325,
                centerBox: true,
                autoCropHeight: 354,
                // fixedNumber: '[1:1]',
                fixedBox: true
            }
        };
    },
    computed:{
        ...mapGetters({
            itemId: "itemId",
            image: "image",
            maxImgSize: "maxImgSize"
        }),
        textImg: function(){
            return require(`@/assets/text-photo-0${this.itemId}.png`);
        }
    },
    methods: {
        upload(){
            this.$refs.cropper.getCropData((data) => {
                this.drawCanvas(data)
            })
        },
        async drawCanvas(data) {
            var self = this;
            let bkg = require(`@/assets/composite-0${self.itemId}.png`);
            var imgsrcArray = [data, bkg];
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            // let ratio = self.getPixelRatio(ctx);

            canvas.width = 750;
            canvas.height = 818;
            var imglen = imgsrcArray.length;
            (function f(n) {
                if (n < imglen) {
                var img = new Image();
                img.crossOrigin = "Anonymous"; //解决跨域问题
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, 750, 818);
                    if(n == 0){
                        let imageData = ctx.getImageData(0,0, canvas.width , canvas.height)
                        let pixelData = imageData.data
                        for( var i = 0 ; i < canvas.width * canvas.height ; i ++ ){
                            var r = pixelData[i*4+0];
                            var g = pixelData[i*4+1];
                            var b = pixelData[i*4+2];
                            if( self.filterClass == 'filter-02'){
                                var grey = r*0.3+g*0.59+b*0.11;
                                pixelData[i*4+0] = grey;
                                pixelData[i*4+1] = grey;
                                pixelData[i*4+2] = grey;
                            }
                            else{
                                r = (r-g-b)*3/2;
                                g = (g-r-b)*3/2;
                                b = (b-g-r)*3/2;
                                // pixelData[i*4+0] = (r-g-b)*3/2;
                                // pixelData[i*4+1] = (g-r-b)*3/2;
                                // pixelData[i*4+2] = (b-g-r)*3/2;
                            }
                        }
                        ctx.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height );
                    }
                    f(n + 1);
                };
                img.src = imgsrcArray[n];
                } else {
                    self.canvas = canvas.toDataURL("image/png", 1);
                    self.$store.dispatch("upload", self.canvas).then(()=>{
                        self.$router.replace({name:'result'})
                    })
                }
            })(0);
            },
        pickFile() {
            this.$refs["image"].click();
        },
        onFilePicked(e) {
            let files = e.target.files;
            this.photoed = true
            this.$store.dispatch("filePicked", files);
        },
        realTime(data){
            // this.realImage = data.url
            // let s = 160/355
            let w = (document.body.clientWidth - 325) / 2
            let s = 80/355 * data.scale
            let x = Math.ceil((data.transX-w)*s)
            let y = Math.ceil((data.transY-28)*s)
            data.style = {
                width:`${data.trueWidth*s}px`,
                height:`${data.trueHeight*s}px`,
                transform:
                    `scale(1,1) translate3d(${x}px,${y}px,0) rotateZ(0deg)`
            }
            this.preview = data
        },
        imgLoad(){
        }
    }
}
</script>
<style scoped>
.photo-tip {
  position: absolute;
  top: 0;
  left: 0;
  width: 27.8rem;
  height: 24rem;
  margin: 2rem 0 0 2rem;
  background: url("../assets/tip-photo-01.png") 0 0 no-repeat;
  background-size: 27.8rem auto;
  z-index: 3;
  text-align: center;
}
.photo-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: #333;
}
.filter-01 {
    filter: brightness(1.1) contrast(1.1) saturate(1.1);
}
.filter-02 {
    filter: grayscale(100%);
}
.photo-image .photo-choose {
    z-index: 9;
    position: absolute;
    left: 0;
    right: 0;
    top: 38rem;
    display: flex;
    margin: 0 8rem;
    justify-content: space-around;
}
.photo-preview {
    width: 80px;
    height: 87px;
    overflow: hidden;
    border: 2px solid #94010c;
    display: block;
    user-select: none;
}
.photo-preview img {
    transform-origin:left top;
}
.photo-star {
    z-index: 9;
    position: absolute;
    left: 0;
    top: 46rem;
    right: 0;
    text-align: center;
    margin-bottom: 2rem;
}
.photo-tip .photo-text-img {
    margin-top: 2rem;
    width: 27.5rem;
}
.photo-tip .photo-title-img {
    margin-top: 2rem;
    width: 6.7rem;
}
.photo-preview {
    position: relative;
}
.photo-choosed {
    position: absolute;
    right: 0;
    top: 0;
    margin: 1rem;
}
.photo-uri {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
</style>

