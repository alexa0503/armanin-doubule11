<template>
    <v-container fluid>
        <div class="logo"><img src="@/assets/logo.png" width="105">
            <div class="logo-edit"><img src="@/assets/icon-edit-01.png" width="32" @click="logoEdit" /></div>
            <div class="logo-close"><img src="@/assets/icon-close-04.png" width="32" @click="logoClose" /></div>
        </div>
        <div class="list">
            <div v-for="(item,index) in stars" :key="index" class="list-item">
                <div class="list-item-content">
                    <img :src="require('../assets/photos/'+item.id+'.png')" class="img-fluid" @click="selectItem(index)">
                    <div class="list-item-desc">
                        <div>{{ item.comment | stringLimit }}</div>
                        <div class="list-item-footer">
                            <div class="list-avatar"><img :src="require('../assets/avatars/'+item.id+'.png')">{{ item.nickname }}</div>
                            <div class="list-item-heart"><img src="@/assets/icon-heart-01.png" @click="follow(item.id)">{{ item.follow_number }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="detailSeen" class="item-detail">
            <div class="item-detail-content">
                <div class="item-detail-topper">
                    <div><img src="@/assets/icon-close-03.png" width="13" @click="detailSeen=false"></div>
                    <div><img src="@/assets/icon-edit.png" width="20" @click="goTo"></div>
                </div>
                <div class="item-detail-avatar mb-2"><img :src="require('../assets/avatars/'+currentStar.id+'.png')">{{currentStar.nickname}}</div>
                <div class="item-detail-img">
                    <img :src="require('../assets/photos/'+currentStar.id+'.png')" class="img-fluid" v-if="!currentStar.img">
                    <img :src="currentStar.img" class="img-fluid" v-else>
                </div>
                <div class="item-detail-desc" v-if="!editing">{{ currentStar.comment }}</div>
                <div class="item-detail-date" v-if="!editing">{{currentStar.created_at}}</div>
                <div class="editor" v-if="editing">
                    <textarea v-model="comment" placeholder="输入您的评论"></textarea>
                </div>
                <div class="editor-button" v-if="editing">
                    <img @click="submit" src="@/assets/button-upload.png" width="106" />
                </div>
            </div>
        </div>
        <div v-if="detailSeen" class="item-detail-mask"></div>
        <div class="editor-succeed" v-if="goNow">
            <div class="mb-4">先去和明星产品拍摄试镜<br/>再来评论区打call！</div>
            <!-- <div class="mt-4"><img src="@/assets/button-lottery.png" width="175" @click="$router.replace({name:'photo'})" /></div> -->
            <div class="mt-4"><img @click="$router.replace({name:'photo'})" src="@/assets/button-go-now.png" width="150" /></div>
        </div>
    </v-container>
</template>
<script>
    import {
        listUrl,
        followUrl
    } from "../utils/api.js"
    import {
        TweenLite
    } from "gsap/TweenMax";
    import {getWH} from "../utils/util.js"
    export default {
        name: "App",
        data() {
            return {
                detailSeen: false,
                editing: false,
                succeed: false,
                goNow: false,
                currentStar: {},
                comment: '',
                stars: {},
                fromRouterName: 'items',
                scrollHeight: 0,
            }
        },
        mounted() {
            this.$store.commit('loading', true)
            let id = this.$router.history.current.params.id
            axios.get(`${listUrl}&item=${id}`).then((res) => {
                this.$store.commit('loading', false)
                let data = res.data.data
                this.stars = data
                let current = this.$router.history.current
                if (current.params && current.params.had == 'y') {
                    this.selectItem(0)
                    this.currentStar.img = this.$store.getters.canvas
                    this.editing = true
                }
            }).catch((err) => {
                this.$store.commit('loading', false)
            })
            document.querySelector('.list').addEventListener('touchmove', function(e) {
                e.stopPropagation();
            });
        },
        watch: {
            '$route' (to, from) {
                if (from && from.name) {
                    this.fromRouterName = from.name
                }
            }
        },
        methods: {
            // vuetouch(s,e) {
            //     // const obj = document.querySelector('.container')
            //     // let h = getWH(obj,"height")
            //     // if( this.scrollHeight > h - 800 ){
            //     //     return false;
            //     // }
            //     // this.scrollHeight += 400;
            //     // TweenLite.to(obj, 0.6, {
            //     //     y: "-=400px"
            //     // })

            //     // const obj = document.querySelector('.container')
            //     // let h = getWH(obj,"height")
            //     // if( this.scrollHeight <= 0 ){
            //     //     return false;
            //     // }
            //     // this.scrollHeight -= 400;
            //     // TweenLite.to(obj, 0.6, {
            //     //     y: "+=400px"
            //     // })
            // },
            logoEdit: function() {
                this.goTo()
            },
            logoClose: function() {
                let name = this.fromRouterName
                this.$router.replace({
                    name: name
                })
            },
            selectItem: function(index) {
                this.currentStar = this.stars[index]
                this.detailSeen = true
                setTimeout(() => {
                    let sTop = document.body.scrollTop + document.documentElement.scrollTop;
                    let node = document.querySelector('.item-detail')
                    TweenLite.to(node, 0.5, {
                        "margin-top": sTop + "px"
                    })
                    let h1 =  window.screen.height || document.documentElement.clientHeight;
                    // let h1 = getWH(document.screen, "height")
                    //
                    node = document.querySelector('.item-detail-content')
                    let h2 = getWH(node, "height")
                    if( h2 > h1 - 100){
                        node.style.maxHeight = (h1 - 50) + 'px'
                    }
                    
                    node.addEventListener('touchmove', function(e) {
                        e.stopPropagation();
                    });
                    // node.style = "padding-top: " + sTop + "px"
                }, 200);
            },
            follow: function(id) {
                this.$store.commit('loading', true)
                axios.get(followUrl).then((res) => {
                    this.$store.commit('loading', false)
                    let data = res.data.data
                    // this.stars = Object.assign({},data)
                }).catch((err) => {
                    this.$store.commit('loading', false)
                })
            },
            goTo: function() {
                this.$store.dispatch('goNow', true)
                this.goNow = true
            },
            submit: function() {
                if (this.comment == '') {
                    alert('请输入您的评论')
                } else {
                    this.succeed = true
                    this.detailSeen = false
                    alert('提交成功')
                }
            }
        }
    }
</script>
<style scoped>
    .logo {
        text-align: center;
        margin: 2rem;
        position: relative;
    }
    .logo-edit {
        position: absolute;
        left: 0;
        top: 0;
    }
    .logo-close {
        position: absolute;
        right: 0;
        top: 0;
    }
    .list {
        margin: 0 1rem;
        column-count: 2;
        column-gap: 0;
        counter-reset: item-counter;
    }
    .list .list-item {
        box-sizing: border-box;
        break-inside: avoid;
        padding: 5px 2px;
        counter-increment: item-counter;
    }
    .list .list-item-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0px;
        height: auto;
        color: #000;
        box-sizing: border-box;
    }
    .list .list-item-desc {
        background: #f9f7f3 url('../assets/bkg-list.png') 0 0 no-repeat;
        background-size: 100% auto;
        padding: 1rem;
        width: 100%;
        font-size: 1.4rem;
        line-height: 1.8rem;
    }
    .list-item-footer {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
    }
    .list-avatar,
    .list-item-heart {
        align-items: center;
        display: flex;
    }
    .list-avatar img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 2.5rem;
        margin-right: 0.4rem;
    }
    .list-item-heart img {
        width: 3.8rem;
        height: 3.8rem;
    }
    .item-detail {
        position: fixed;
        z-index: 10;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        overflow: auto;
    }
    .item-detail-mask {
        position: fixed;
        z-index: 9;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(152, 19, 1, 0.85);
    }
    .item-detail-content {
        font-size: 1.4rem;
        background: #fff;
        margin: 5rem 2.5rem;
        padding: 1rem 1rem 2rem;
        overflow: auto;
    }
    .item-detail-content .item-detail-topper {
        display: flex;
        justify-content: space-between;
    }
    .item-detail-avatar {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .item-detail-avatar img {
        width: 5.4rem;
        height: 5.4rem;
        border-radius: 5.4rem;
        margin-right: 1rem;
    }
    .item-detail-img {
        max-height: 36rem;
        overflow: hidden;
    }
    .item-detail-desc {
        margin-top: 2rem;
    }
    .item-detail-date {
        margin-top: 2rem;
        text-align: right;
    }
    .editor textarea {
        border: none;
        outline: none;
        height: 10rem;
    }
    .editor-button {
        text-align: center;
    }
    .editor-succeed {
        background: #960511 url('../assets/bkg-01.jpg') 0 0 no-repeat;
        background-size: 100% auto;
        font-size: 1.4rem;
        color: #FFF;
        position: fixed;
        z-index: 200;
        padding-top: 36rem;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
    }
</style>


