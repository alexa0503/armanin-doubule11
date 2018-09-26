<template>
  <v-container fluid>
    <div class="logo"><img src="@/assets/logo.png" ></div>
    <div class="result-canvas">
      <img :src="canvas" >
    </div>
    <div class="result-footer" v-if="!goNow">
      <div class="mt-4"><img 
        src="@/assets/text-result.png" 
        width="250" ></div>
      <div class="mt-3"><img 
        src="@/assets/button-receive.png" 
        width="186" 
        @click="seen = true" ></div>
    </div>
    <div class="result-footer" v-else>
        <img @click="$router.replace({name:'comment'})" class="mt-4" src="@/assets/button-return.png" width="126" />
    </div>
    <div class="form" v-if="seen">
      <div class="form-container">
        <div class="title mb-4"><img 
          src="@/assets/title-form-01.png" 
          width="135" ></div>
        <div class="input-01 mt-4"><input v-model="inputs.name" placeholder="请输入姓名" type="text" ></div>
        <div class="input-02 mt-2"><input type="tel" v-model="inputs.mobile" placeholder="请输入手机" ></div>
        <div class="input-03 mt-2"><input type="tel" v-model="inputs.code" placeholder="验证码" ><div v-if="sent" class="tel-tip" @click="sendMsg">{{resetTime}}S后<br/>重新发送</div><div @click="sendMsg" class="tel-tip" v-else>点击<br/>发送</div></div>
        <div class="text-agree mt-2 mb-4">
            <img @click="agree()" style="margin-right:0.5rem;" src="@/assets/icon-agree-01.png" width="10" v-if="agreed" />
            <img @click="agree()" style="margin-right:0.5rem;" src="@/assets/icon-agree-02.png" width="10" v-if="!agreed" />
            <img @click="agree()" width="245" src="@/assets/text-agree.png" alt="我同意依照本隐私政策对我的个人信息进行收集和使用;我已阅读并确认已被给予充分机会理解该隐私政策的内容。" />
        </div>
        <div class="mt-4 form-button">
            <img @click="formSubmit" src="@/assets/button-submit.png" width="126" />
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
    import {
        mapGetters
    } from "vuex";
    export default {
        name: "App",
        data() {
            return {
                resetTime: 60,
                seen: false,
                agreed: true,
                sent: false,
                inputs: {
                    mobile:'',
                    name: '',
                    code: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                canvas: "canvas",
                goNow: "goNow"
            })
        },
        methods: {
            agree(){
                window.console.log(this.agreed)
                if( this.agreed ){
                    this.agreed = false
                }
                else{
                    this.agreed = true
                }
            },
            sendMsg(){
                if(!this.sent){
                    this.sent = true
                    this.resetTime = 59
                    let t = setInterval(()=>{
                        --this.resetTime
                        if( this.resetTime <= 0 ){
                            this.sent = false
                            window.clearInterval(t)
                        }
                    },1000)
                }
            },
            formSubmit(){
                let inputs = this.inputs
                if( inputs.name == '' ){
                    alert('请输入姓名')
                }
                else if( inputs.name.length > 20 ){
                    alert('姓名太长了')
                }
                else if( inputs.mobile == ''){
                    alert('请输入手机号')
                }
                else if( ! /^1[0-9]{10}$/.test(inputs.mobile)){
                    alert('手机号码格式不正确')
                }
                else if( inputs.code == '' ){
                    alert('验证码不正确')
                }
                else{
                    // this.seen = false
                    alert('提交成功')
                    window.location.href="//www.baidu.com"
                }
            }
        }
    }
</script>
<style scoped>
    .form {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(150, 2, 11, 0.85);
    }
    .form .form-container {
        margin: 20rem auto 0;
        display: flex;
        width: 25rem;
        flex-direction: column;
        justify-content: space-around;
    }
    .form-container .title {
        text-align: center;
    }
    .form-button {
        text-align: center;
    }
    .form-container input {
        border: solid #000 1px;
        font-size: 1.4rem;
        height: 1.4rem;
        background: #fff;
        outline: none;
        width: 25rem;
        padding: 1.8rem 0.1rem 1.8rem 9rem;
    }
    .form-container .input-01,.form-container .input-02,.form-container .input-03 {
        position: relative;
        width: 25rem;
    }
    .form-container .input-01::after,.form-container .input-02::after,.form-container .input-03::after{
        content: "";
        position: absolute;
        left:0;
        top: 2px;
        bottom: 0;
        background: url('../assets/label-name.png') 0 center no-repeat;
        background-size:8.25rem auto;
        z-index: 99;
        height: 3.5rem;
        width: 9rem;
        display: block;
    }
    .form-container .input-02::after {
        background: url('../assets/label-mobile.png') 0 center no-repeat;
        background-size:8.25rem auto;
    }
    .form-container .input-03::after {
        background: url('../assets/label-code.png') 0 center no-repeat;
        background-size:8.25rem auto;
    }
    .input-03 input {
        width: 20rem;
    }
    .input-03 {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }
    .tel-tip {
        background: url('../assets/bkg-code.png') 0 center no-repeat;
        background-size: 4.5rem auto;
        width: 4.5rem;
        height: 3.4rem;
        padding: 0.6rem 0;
        line-height: 1.2rem;
        font-size: 1rem;
        text-align: center;
        color: #000;
    }
    .text-agree {
        color: #fff;
        font-size: 1.2rem;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-left: -1.2rem;
    }
    .logo {
        text-align: center;
        margin: 2rem;
    }
    .logo img {
        width: 10.3rem;
    }
    .result-canvas img {
        width: 100%;
    }
    .result-footer {
        text-align: center;
        margin: 2rem 0;
    }
</style>


