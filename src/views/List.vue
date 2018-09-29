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
                            <div class="list-item-heart"><img src="@/assets/icon-heart-01.png" @click="follow(index)" v-if="stars[index].followed != true"><img src="@/assets/icon-heart-02.png" v-else>{{ item.follow_number }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="detailSeen" class="item-detail">
            <div class="item-detail-content">
                <div class="item-detail-topper">
                    <div><img src="@/assets/icon-close-03.png" width="13" @click="closeDetail"></div>
                    <div v-if="!editing"><img src="@/assets/icon-edit.png" width="20" @click="goTo"></div>
                </div>
                <div class="item-detail-avatar mb-2">
                    <img :src="currentStar.avatar" v-if="currentStar.avatar">
                    <img :src="require('../assets/avatars/'+currentStar.id+'.png')" v-else>{{currentStar.nickname}}</div>
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
            <!-- <div class="mt-4"><img src="@/assets/button-lottery.png" width="175" @click="$router.push({name:'photo'})" /></div> -->
            <div class="mt-4"><img @click="$router.push({name:'photo'})" src="@/assets/button-go-now.png" width="150" /></div>
        </div>
        <div class="tip-upload-succed" v-if="succeed">
            <div class="mb-2"><img src="@/assets/icon-upload-succed.png" width="75" /></div>
            <div class="mt-3" @click="goElite"><img src="@/assets/button-go-elite.png" width="133" />></div>
        </div>
    </v-container>
</template>
<script>
    import {
        listUrl,
        followUrl
    } from "../utils/api.js"
    import {
        mapGetters
    } from "vuex";
    import {
        TweenLite
    } from "gsap/TweenMax";
    import {
        getWH
    } from "../utils/util.js"
    export default {
        name: "App",
        data() {
            return {
                detailSeen: false,
                editing: false,
                succeed: false,
                goNow: false,
                currentStar: {id:1,nickname:'',},
                comment: '',
                stars: [],
                fromRouterName: 'items',
                scrollHeight: 0,
            }
        },
        computed: {
            ...mapGetters({
                user: "user",
            }),
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
                    this.editing = true
                    this.selectItem(0)
                    this.currentStar.avatar = this.user.avatar
                    this.currentStar.nickname = this.user.nickname
                    this.currentStar.img = this.$store.getters.canvas
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
            },
            'stars':{
                handler:function(newValue,oldValue){
                },
                deep:true,
            }
        },
        methods: {
            logoEdit: function() {
                this.goTo()
            },
            logoClose: function() {
                let name = this.fromRouterName
                this.$router.push({
                    name: name
                })
            },
            closeDetail(){
                this.detailSeen=false
                document.querySelector('#app').addEventListener('touchmove', function(e) {
                        e.returnValue = true
                        // e.stopPropagation();
                    });
            },
            selectItem: function(index) {
                if( this.stars.length > 0 ){
                    this.currentStar = this.stars[index]
                }
                this.detailSeen = true
                setTimeout(() => {
                    document.querySelector('#app').addEventListener('touchmove', function(e) {
                        if( e.cancelable ){
                            e.preventDefault();
                        }
                    }, {
                        passive: false
                    });
                    document.querySelector('.item-detail-mask').addEventListener('touchmove', function(e) {
                        if( e.cancelable ){
                            e.preventDefault();
                        }
                    }, {
                        passive: false
                    });
                    document.querySelector('.item-detail').addEventListener('touchmove', function(e) {
                        e.returnValue = true
                        e.stopPropagation();
                    });
                }, 200);
            },
            follow: function(id) {
                this.stars[id].followed = true
                this.stars[id].follow_number += 1
                // this.$store.commit('loading', true)
                // axios.get(followUrl).then((res) => {
                //     this.$store.commit('loading', false)
                //     let data = res.data.data
                //     // this.stars = Object.assign({},data)
                // }).catch((err) => {
                //     this.$store.commit('loading', false)
                // })
            },
            goTo: function() {
                this.$store.dispatch('goNow', true)
                this.goNow = true
            },
            goElite: function(){
                window.location.href = "http://campaign.giorgioarmanibeauty.cn/double112018shoppingguideline"
            },
            submit: function() {
                if (this.comment == '') {
                    alert('请输入您的评论')
                } else {
                    this.succeed = true
                    this.detailSeen = false
                    // alert('提交成功')
                }
            }
        }
    }
</script>
<style scoped>
    .logo {
        text-align: center;
        padding: 20px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #960511;
    }
    .logo-edit {
        position: absolute;
        left: 20px;
        top: 20px;
    }
    .logo-close {
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .list {
        margin: 90px 1rem 0;
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
        font-size: 10px;
        line-height: 14px;
    }
    .list-avatar,
    .list-item-heart {
        align-items: center;
        display: flex;
        width: 50%;
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
        z-index: 100;
        top: 50%;
        right: 0;
        left: 0;
        height: 500px;
        overflow: hidden;
        overflow-y: scroll;
        background: #000;
        font-size: 1.4rem;
        background: #fff;
        margin: -250px 2.5rem 0;
        padding: 1rem 1rem 2rem;
    }
    .item-detail-mask {
        position: fixed;
        z-index: 9;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(152, 19, 1, 0.85);
        pointer-events: none;
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
        width: 100%;
        border: none;
        outline: none;
        height: 6rem;
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
    .tip-upload-succed {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(179, 0, 23, 0.85);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>


