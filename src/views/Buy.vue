<template>
    <v-container v-swipeleft="{fn:swipeleft,name:'左滑'}" v-swiperight="{fn:swiperight,name:'右滑'}" align-center justify-start column fluid>
        <transition :name="transitionName">
            <div id="buy-container" @touchmove="move" class="buy-container" v-if="show">
                <div class="title-logo">
                    <img src="@/assets/logo-02.png" width="126" />
                    <img :src="title" width="250" v-if="title" />
                </div>
                <div class="item">
                    <img :src="itemImg" width="280" />
                    <div class="arrowLeft"><img height="55" src="@/assets/arrow-left.png" @touchend="swiperight" /></div>
                    <div class="arrowRight"><img height="55" src="@/assets/arrow-right.png" @touchend="swipeleft" /></div>
                </div>
                <div class="buy-desc" v-if="buyDesc">
                    <img :src="buyDesc" width="200" />
                </div>
                <div class="star-desc" v-for="(item,index) in starDesc" :key="index" v-bind:class="[id==6&&index==2?'star-special':'']">
                    <div class="star-desc-title">
                        <img :src="require(`@/assets/title-buy-star-${item}.png`)" width="100" />
                    </div>
                    <img :src="require(`@/assets/buy-0${id}-0${index+1}.png`)" class="img-fluid" />
                </div>
                <div class="star-buttons" v-if="buttonsSeen">
                    <img v-if="id==6" src="@/assets/button-buy-01.png" width="191" @touchend="showForm" />
                    <img @touchend="$router.push({name:'item',params:{id:id}})" src="@/assets/button-buy-02.png" width="191" />
                </div>
                <div class="star-form" v-if="id == 6 && formSeen">
                    <div class="input-01"><input v-model="name" /></div>
                    <div class="input-02"><input v-model="mobile" /></div>
                    <div class="form-agree">
                        <img src="@/assets/icon-agree-03.png" width="11" v-if="!agreed" @touchend="agreed = true" />
                        <img src="@/assets/icon-agree-04.png" width="11" v-if="agreed" @touchend="agreed = false" />
                        <img usemap="#privacy" src="@/assets/text-agree-02.png" width="253" />
                        <map name="privacy">
                                            <area shape="rect" coords="50,0,120,20" href ="http://policy.lorealchina.com/privacypolicy"  />
                                        </map>
                    </div>
                    <div class="star-form-submit">
                        <img @touchend="formSubmit" src="@/assets/buy-submit.png" width="106" />
                    </div>
                    <div class="form-tip" v-if="formTip">
                        <img src="@/assets/icon-succeed.png" width="59" />
                        <img @touchend="$router.push({name:'item',params:{id:id}})" src="@/assets/button-buy-02.png" width="191" />
                    </div>
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
    import {
        infoUrl
    } from '../utils/api';
    export default {
        name: "App",
        data() {
            return {
                agreed: true,
                buttonsSeen: true,
                formSeen: false,
                formTip: false,
                name: '',
                mobile: '',
                id: '',
                show: true,
                transitionName: '',
                scrollTop: 0,
                starDescs: [
                    [3, 4],
                    [1, 2],
                    [1, 5, 6],
                    [1, 8],
                    [3, 7],
                    [9, 10, 11]
                ]
            };
        },
        computed: {
            itemImg: function() {
                let id = this.id;
                return require(`@/assets/item-0${id}.png`);
            },
            title: function() {
                let id = this.id;
                if (id < 6) {
                    return require(`@/assets/title-buy-0${id}.png`);
                } else {
                    return false
                }
            },
            buyDesc: function() {
                let id = this.id;
                if (id < 6) {
                    return require(`@/assets/text-buy-desc-0${id}.png`);
                } else {
                    return false;
                }
            },
            starDesc: function() {
                let id = this.id;
                return this.starDescs[id - 1]
            }
        },
        created() {
            let id = parseInt(this.$router.history.current.params.id)
            if (!id || id < 1 || id > 6) {
                this.id = 1
            } else {
                this.id = id
            }
            this.$store.dispatch('chooseItem', this.id)
        },
        mounted() {
            this.listen()
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
                    this.listen()
                }, 150);
            }
        },
        methods: {
            listen() {
                document.querySelector('.buy-container').addEventListener('touchmove', function(e) {
                    e.stopPropagation();
                });
            },
            move(e) {
                this.scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            },
            swiperight() {
                if (this.scrollTop > 100) {
                    return false;
                }
                let id = this.id
                let nextId
                if (id > 1) {
                    nextId = id - 1
                } else {
                    nextId = 6
                }
                this.transitionName = 'slide-left'
                this.$router.push({
                    name: 'buy',
                    params: {
                        id: nextId
                    }
                })
            },
            swipeleft() {
                if (this.scrollTop > 100) {
                    return false;
                }
                let id = this.id
                let nextId
                if (id < 6) {
                    nextId = id + 1
                } else {
                    nextId = 1
                }
                this.transitionName = 'slide-right'
                this.$router.push({
                    name: 'buy',
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
            },
            showForm() {
                this.formSeen = true
                this.buttonsSeen = false
            },
            formSubmit() {
                let name = this.name
                let mobile = this.mobile
                let agreed = this.agreed
                if (name == '') {
                    alert('请输入姓名')
                } else if (mobile == '') {
                    alert('请输入手机号')
                } else if (!agreed) {
                    alert('请勾选隐私政策')
                } else if (!/^1[0-9]{10}$/.test(mobile)) {
                    alert('手机号码格式不正确')
                } else {
                    this.formTip = true
                    return;
                    this.$store.commit('loading', true)
                    let data = new FormData();
                    data.set('name', name)
                    data.set('mobile', mobile)
                    window.axios({
                        url: infoUrl,
                        method: "post",
                        config: {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        },
                        data: data
                    }).then((res) => {
                        this.$store.commit('loading', false)
                        if (res.data.ret != 0 && res.data.message) {
                            alert(res.data.message)
                        }
                        this.formTip = true
                    }).catch(error => {
                        this.$store.commit('loading', false)
                        alert('提交失败，请重试')
                    })
                }
            }
        }
    };
</script>
<style scoped>
    .buy-container {
        overflow: hidden;
        overflow-y: auto;
    }
    .title-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin-top: 26px;
    }
    .item {
        background: url('../assets/star.png') 0 0 no-repeat;
        background-size: 100% auto;
        max-width: 100%;
        margin: 10px 17px 0;
        height: 320px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .arrowLeft,
    .arrowRight {
        position: absolute;
        top: 70px;
    }
    .arrowLeft {
        left: 10px;
    }
    .arrowRight {
        right: 10px;
    }
    .buy-desc {
        background: url('../assets/border-buy.jpg') 0 0 no-repeat;
        background-size: 100% auto;
        max-width: 100%;
        margin: 10px 17px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 190px;
    }
    .star-desc {
        max-width: 100%;
        margin: 150px 17px 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .star-form {
        max-width: 100%;
        height: 400px;
        margin: 50px 17px 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        position: relative;
        background: url('../assets/buy-form.png') 0 0 no-repeat;
        background-size: 100% auto;
        position: relative;
        padding: 26% 17% 0 17%;
    }
    
    .star-form-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        margin-top: 20px;
    }
    .star-form input {
        border: none;
        border-bottom: 1px solid #000;
        font-size: 1.4rem;
        height: 1.4rem;
        background: transparent;
        outline: none;
        padding: 1.8rem 0.1rem .8rem 0;
        width: 58%;
        margin-left: 32%;
        position: relative;
    }
    .star-form .input-01,
    .star-form .input-02 {
        position: relative;
        margin-bottom: 10px;
        height: 40px;
        width: 100%;
    }
    .star-form .input-01::after,
    .star-form .input-02::after {
        content: "";
        position: absolute;
        left: 0;
        top: -4px;
        bottom: 0;
        background: url('../assets/label-name-01.png') 0 center no-repeat;
        background-size: 58px auto;
        z-index: 99;
        width: 9rem;
        display: block;
    }
    .star-form .input-02::after {
        background: url('../assets/label-mobile-01.png') 0 center no-repeat;
        background-size: 58px auto;
    }
    .star-buttons {
        max-width: 100%;
        margin: 50px 17px 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        position: relative;
    }
    .form-tip {
        position: absolute;
        background: rgba(163, 0, 0, 0.8);
        border-radius: 5px;
        left: 0;
        right: 0;
        top: 90px;
        height: 200px;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .form-agree {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
        margin-left: -40px;
        margin-top: 0px;
    }
    .form-agree img {
        margin-right: 5px;
        padding-top: 10px;
    }
    .star-special {
        margin: 150px 0 50px!important;
    }
    .star-desc-title {
        position: absolute;
        width: 257px;
        background: url('../assets/bkg-star-01.png') 0 0 no-repeat;
        background-size: 100% auto;
        top: -130px;
        left: 50%;
        margin-left: -126px;
        height: 245px;
        padding-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width:320px) {
        .item {
            width: 320px;
            height: 290px;
        }
        .buy-desc {
            width: 320px;
        }
    }
    @media screen and (min-width:400px) {
        .item {
            height: 360px;
        }
        .buy-desc {
            height: 210px;
        }
    }
</style>
