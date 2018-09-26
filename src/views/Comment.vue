<template>
    <v-container fluid>
        <div class="logo"><img src="@/assets/logo.png"></div>
        <div class="list">
            <div v-for="(item,index) in photos" :key="index" class="list-item">
                <div class="list-item-content">
                    <img :src="item.img" class="img-fluid" @click="selectItem(index)">
                    <div class="list-item-desc">
                        <div>{{ item.desc | stringLimit }}</div>
                        <div class="list-item-footer">
                            <div class="list-avatar"><img :src="item.avatar">{{ item.nickname }}</div>
                            <div class="list-item-heart"><img src="@/assets/icon-heart-01.png" @click="follow(index)">{{ item.follow }}</div>
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
                <div class="item-detail-avatar mb-2"><img :src="currentItem.avatar">{{currentItem.nickname}}</div>
                <div class="item-detail-img"><img :src="currentItem.img" class="img-fluid"></div>
                <div class="item-detail-desc" v-if="!editing">{{ currentItem.desc }}</div>
                <div class="item-detail-date" v-if="!editing">2018.09.24</div>
                <div class="editor" v-if="editing">
                    <textarea v-model="comment" placeholder="输入您的评论"></textarea>
                </div>
                <div class="editor-button" v-if="editing">
                    <img @click="submit" src="@/assets/button-upload.png" width="106" />
                </div>
            </div>
        </div>
        <div class="editor-succeed" v-if="goNow">
            <div class="mb-4">先去和明星产品拍摄试镜<br/>再来评论区打call！</div>
            <!-- <div class="mt-4"><img src="@/assets/button-lottery.png" width="175" @click="$router.replace({name:'photo'})" /></div> -->
            <div class="mt-4"><img @click="$router.replace({name:'photo'})" src="@/assets/button-go-now.png" width="150" /></div>
        </div>
    </v-container>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                detailSeen: false,
                editing: false,
                succeed: false,
                goNow: false,
                currentItem: {},
                comment: '',
                photos: [{
                        desc: '颜色很适合我，味道很好闻，喜欢。',
                        img: require('@/assets/photos/1.png'),
                        avatar: require('@/assets/avatars/1.png'),
                        nickname: "钟楚曦",
                        follow: 4323
                    },
                    {
                        desc: '自从买了500别的口红什么的都被我放一边了。滋润度都超级好，阳光闪闪的淡妆也很自然，可以说非常好看了。',
                        img: require('@/assets/photos/2.png'),
                        avatar: require('@/assets/avatars/2.png'),
                        nickname: "西门大嫂",
                        follow: 4523
                    },
                    {
                        desc: '终于买到了500！！专柜没货，旗舰店也一直断货，看了很久才抢到，然后等了很久才等到，超级显白，好看啊，超级喜欢！！',
                        img: require('@/assets/photo-01.png'),
                        avatar: require('@/assets/avatars/3.png'),
                        nickname: "黑管",
                        follow: 231
                    },
                    {
                        desc: '之前一直用雅诗兰黛的，都说它控油！但是我用着并不是很好，这次想尝试一下这个，真的特别好用，感觉像自己的皮肤一样，老公说看起来是不一样了！本来2和3.5很纠结的！！！我是黄色，而且很有点暗沉那种！但是老公建议我买2号色，说化妆本来就是为了皮肤看起来白，好一点！结果真的是太好了，非常自然的白！黄皮肤也可以买2号的哦',
                        img: require('@/assets/photos/4.png'),
                        avatar: require('@/assets/avatars/4.png'),
                        nickname: "黑管",
                        follow: 6455
                    }
                ]
            }
        },
        mounted(){
            this.selectItem(0)
            this.currentItem.img = this.$store.getters.canvas
            this.editing = true
        },
        methods: {
            selectItem: function(index) {
                this.currentItem = this.photos[index]
                this.detailSeen = true
            },
            follow: function(index) {},
            goTo: function(){
                this.$store.dispatch('goNow', true)
                this.goNow = true
            },
            submit: function() {
                if (this.comment == '') {
                    alert('请输入您的评论')
                } else {
                    this.succeed = true
                }
            }
        }
    }
</script>
<style scoped>
    .logo {
        text-align: center;
        margin: 2rem;
    }
    .logo img {
        width: 10.3rem;
    }
    .list {
        margin: 0 2rem;
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
        font-size: 1.4rem;
        line-height: 1.8rem;
    }
    .list-item-footer {
        margin-top: 1.8rem;
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
        background: rgba(152, 19, 1, 0.85);
    }
    .item-detail-content {
        font-size: 1.4rem;
        background: #fff;
        margin: 5rem 2.5rem;
        padding: 1rem;
        width: auto;
        overflow: auto;
        height: 50rem;
        overflow-x: hidden;
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


