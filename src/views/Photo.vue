<template>
    <v-container fluid>
        <div v-if="!photoed" class="photo-uri">
            <div class="photo-tip" v-bind:class="topTip">
                <img src="@/assets/button-photo-01.png" class="photo-title-img" @touchend="pickFile">
                <input ref="image" type="file" style="display: none" accept="image/*" @change="onFilePicked($event)">
            </div>
            <img src="@/assets/uri-03.png" class="img-fluid"></div>
        <div v-if="photoed" class="photo-image">
            <vueCropper ref="cropper" :class="filterClass" :img="image" :output-size="option.size" :output-type="option.outputType" :info="false" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :original="option.original" :auto-crop="option.autoCrop"
                :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :fixed-box="option.fixedBox" :center-box="option.centerBox" :max-img-size="maxImgSize || option.maxImgSize" :fixed="false" :high="true" @realTime="realTime" @imgLoad="imgLoad"
            />
            <div class="photo-star"><img src="@/assets/button-star.png" width="110" @touchend="upload"></div>
            <div class="photo-choose">
                <div class="photo-preview"><img :src="image" :style="previews.thumb" class="filter-01" @touchend="filterClass = 'filter-01'">
                    <div v-if="filterClass == 'filter-01'" class="photo-choosed"><img src="@/assets/icon-choosed.png" width="20"></div>
                </div>
                <div class="photo-preview"><img :src="image" :style="previews.thumb" class="filter-02" @touchend="filterClass = 'filter-02'">
                    <div v-if="filterClass == 'filter-02'" class="photo-choosed"><img width="20" src="@/assets/icon-choosed.png"></div>
                </div>
            </div>
        </div>
        <div class="photo-image-preview" v-if="photoed">
            <img :src="image" :style="previews.img">
        </div>
        <div id="photo-image-preview-mask" class="photo-image-preview-mask" v-if="photoed"></div>
    </v-container>
</template>
<script>
    import {
        mapGetters
    } from "vuex";
    import VueCropper from "../plugins/vue-cropper";
    export default {
        name: "App",
        components: {
            VueCropper
        },
        data() {
            return {
                photoed: false,
                previews: {},
                canvas: null,
                filterClass: 'filter-01',
                option: {
                    maxImgSize: 1000,
                    size: 1,
                    full: true,
                    outputSize: 1,
                    outputType: "png",
                    canMove: true,
                    canMoveBox: false,
                    original: true,
                    autoCrop: true,
                    autoCropWidth: 300,
                    autoCropHeight: 300,
                    centerBox: true,
                    // fixedNumber: '[1:1]',
                    fixedBox: true
                }
            };
        },
        computed: {
            ...mapGetters({
                itemId: "itemId",
                image: "image",
                maxImgSize: "maxImgSize",
                
            }),
            textImg: function() {
                return require(`@/assets/text-photo-0${this.itemId}.png`);
            },
            topTip: function(){
                return 'top-tip-0' + this.itemId;
            }
        },
        mounted() {
            this.photoed = true
            setTimeout(() => {
                let screenHeight = window.screen.height || document.documentElement.height;
                document.getElementById('photo-image-preview-mask').style.height = screenHeight - 359 + 'px'
            }, 200);
        },
        methods: {
            upload() {
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
                let ratio = self.getPixelRatio(ctx);
                canvas.width = ratio*750/2;
                canvas.height = ratio*922/2;
                var imglen = imgsrcArray.length;
                (function f(n) {
                    if (n < imglen) {
                        var img = new Image();
                        img.crossOrigin = "Anonymous"; //解决跨域问题
                        img.onload = function() {
                            if (n == 0) {
                                ctx.drawImage(img, 0, 172*(ratio/2), 750*(ratio/2), 750*(ratio/2));
                                let imageData = ctx.getImageData(0, 172*(ratio/2), canvas.width, canvas.height)
                                let pixelData = imageData.data
                                for (var i = 0; i < canvas.width * canvas.height; i++) {
                                    var r = pixelData[i * 4 + 0];
                                    var g = pixelData[i * 4 + 1];
                                    var b = pixelData[i * 4 + 2];
                                    if (self.filterClass == 'filter-02') {
                                        var grey = r * 0.3 + g * 0.59 + b * 0.11;
                                        pixelData[i * 4 + 0] = grey;
                                        pixelData[i * 4 + 1] = grey;
                                        pixelData[i * 4 + 2] = grey;
                                    } else {
                                        r = (r - g - b) * 3 / 2;
                                        g = (g - r - b) * 3 / 2;
                                        b = (b - g - r) * 3 / 2;
                                        // pixelData[i*4+0] = (r-g-b)*3/2;
                                        // pixelData[i*4+1] = (g-r-b)*3/2;
                                        // pixelData[i*4+2] = (b-g-r)*3/2;
                                    }
                                }
                                ctx.putImageData(imageData, 0, 172*(ratio/2), 0, 0, 750*(ratio/2), 750*(ratio/2));
                            } else {
                                ctx.drawImage(img, 0, 0, 750*(ratio/2), 922*(ratio/2));
                            }
                            f(n + 1);
                        };
                        img.src = imgsrcArray[n];
                    } else {
                        self.canvas = canvas.toDataURL("image/png", 1);
                        self.$store.dispatch("upload", self.canvas).then(() => {
                            self.$router.push({
                                name: 'result'
                            })
                        })
                    }
                })(0);
            },
            getPixelRatio() {
                if (window.devicePixelRatio && window.devicePixelRatio > 1) {
                    return window.devicePixelRatio;
                }
                return 1;
            },
            pickFile() {
                this.$refs["image"].click();
            },
            onFilePicked(e) {
                let files = e.target.files;
                this.photoed = true
                this.$store.dispatch("filePicked", files);
                setTimeout(() => {
                    let screenHeight = window.screen.height || document.documentElement.height;
                    document.getElementById('photo-image-preview-mask').style.height = screenHeight - 359 + 'px'
                }, 200);
            },
            realTime(data) {
                this.previews = data
            },
            imgLoad() {}
        }
    }
</script>
<style scoped>
    .photo-tip {
        position: absolute;
        bottom: 28rem;
        left: 2rem;
        width: 25rem;
        height: 24rem;
        z-index: 3;
        text-align: center;
        padding-top: 10rem;
    }
    
    .top-tip-01 {
        background: url("../assets/tip-top-01.png") 0 0 no-repeat;
        background-size: 25rem auto;
        padding-top: 10rem;
    }
    .top-tip-02 {
        background: url("../assets/tip-top-02.png") 0 0 no-repeat;
        background-size: 19rem auto;
        width: 19rem;
        left: 6rem;
        bottom: 26rem;

    }
    .top-tip-03 {
        background: url("../assets/tip-top-03.png") 0 0 no-repeat;
        background-size: 17rem auto;
        width: 17rem;
        left: 6rem;
        padding-top: 12.1rem;
    }
    .top-tip-04 {
        background: url("../assets/tip-top-04.png") 0 0 no-repeat;
        background-size: 22rem auto;
        width: 22rem;
        padding-top: 13.7rem;
    }
    .top-tip-05 {
        background: url("../assets/tip-top-05.png") 0 0 no-repeat;
        background-size: 20.8rem auto;
        width: 20.8rem;
        padding-top: 11.2rem;
        left: 4rem;
    }
    .photo-tip .photo-text-img {
        margin-top: 2rem;
        width: 25.5rem;
    }
    .photo-tip .photo-title-img {
        width: 10.7rem;
    }
    .photo-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
        height: 360px;
        /* background: #95000c; */
    }
    .photo-image-preview {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 4;
        padding-top: 12px;
        padding-left: 12px;
        background: rgba(0, 0, 0, 0.5);
    }
    .photo-image-preview-mask {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background: rgba(0, 0, 0, 0.45);
    }
    .photo-image-preview img {
        margin-left: 25px;
        margin-top: 20px;
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
        top: 36rem;
        display: flex;
        margin: 0 8rem;
        justify-content: space-around;
    }
    .photo-preview {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border: 2px solid #94010c;
        display: block;
        user-select: none;
    }
    .photo-star {
        z-index: 9;
        position: absolute;
        left: 0;
        top: 44rem;
        right: 0;
        text-align: center;
        margin-bottom: 2rem;
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
        bottom: -3px;
        left: 0;
        right: 0;
        z-index: 1;
    }
</style>

