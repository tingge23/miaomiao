<template>
   <div class="password_body">
        <div class="password_email">
            <input v-model="email" placeholder="请输入你的邮箱" class="password_text" type="text"> <button :disabled='disabled' @click="handleToVerify">{{verifyInfo}}</button>
        </div>
        <div>
            <input v-model="password" placeholder="请输入你的新密码" class="password_text" type="password">
        </div>
        <div>
            <input v-model="againPassword" placeholder="请再次确定你的新密码" class="password_text" type="password">
        </div>
        <div>
            <input v-model="verify" placeholder="请输入验证码" class="password_text" type="text">
        </div>
        <div class="password_btn">
            <button @click="handleToPassword">修改密码</button>
        </div>
        <div class="password_link">
            <router-link to="/mine/login">立即登入</router-link>
            <router-link to="/mine/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import {messageBox} from '@/components/JS';

export default {
    name: 'findPassword',
    data(){
        return {
            email : '',
            password : '',
            againPassword : '',
            verify : '',
            verifyInfo : '发送验证码',
            disabled : false
        }
    },
    methods:{
        handleToVerify(){
            if(this.disabled){return;}
            axios.get('/api2/users/verify?email=' + this.email).then((res)=>{
                var status = res.data.status;
                if( status === 0 ){
                    this.countDown();
                    messageBox({
                        title : '验证码',
                        content : '验证码发送成功',
                        ok : '确定'
                    });
                }else{
                    messageBox({
                        title : '验证码',
                        content : '验证码发送失败',
                        ok : '确定'
                    });
                }
            })
        },
        handleToPassword(){
            if(this.email.length === 0){
                 messageBox({
                    title : '错误',
                    content : '请输入邮箱',
                    ok : '确定',
                });
                return ;
            }
            if(this.password.length === 0){
                 messageBox({
                    title : '错误',
                    content : '请输入新密码',
                    ok : '确定',
                });
                return ;
            }
            if(!this.disabled){
                 messageBox({
                    title : '错误',
                    content : '验证码未发送',
                    ok : '确定',
                });
                return ;
            }
            if(this.password !== this.againPassword){
                 messageBox({
                    title : '错误',
                    content : '两次输入的密码不一样',
                    ok : '确定',
                });
                return ;
            }
            if(this.verify.length === 0){
                 messageBox({
                    title : '错误',
                    content : '请输入验证码',
                    ok : '确定',
                });
                return ;
            }
            this.axios.post('/api2/users/findPassword',{
                email : this.email,
                password : this.password,
                verify : this.verify
            }).then((res)=>{
                var status = res.data.status;
                var This = this;
                if(status === 0){
                    messageBox({
                        title : '修改',
                        content : '修改密码成功',
                        ok : '确定',
                        handleOk(){
                            This.$router.push('/mine/login')
                        }
                    });
                }else{
                    messageBox({
                        title : '修改',
                        content : res.data.msg,
                        ok : '确定'
                    });
                }
            });
        },
        countDown(){
            this.disabled = true;
            var count = 60;
            var timer = setInterval(()=>{
                count--;
                this.verifyInfo="剩余"+ count +"秒";
                if(count==0){
                    this.disabled=false;
                    count=60;
                    this.verifyInfo = '发送验证码';
                    clearInterval(timer);
                }
            },1000)
        }
    }

}
</script>

<style>
    #content .password_body{width: 100%;}
    .password_body .password_text{width: 100%;height: 40px;border: none;border-bottom: 1px #ccc solid; margin-bottom: 5px;outline: none;text-align: 10px;}
    .password_body .password_btn{height: 50px;margin: 10px;}
    .password_body .password_email{position: relative;}
    .password_body .password_email button{position: absolute;right: 10px;top: 7px;height: 30px;border-radius: 3px;border: none;padding: 5px;}
    .password_body .password_btn button{width: 100%;height: 100%;background: #e54847;border-radius: 3px;border: none;display:block;color: white;font-size: 20px;}
    .password_body .password_link{display: flex;justify-content: space-around;}
    .password_body .password_link a{text-decoration: none; margin: 0 5px;font-size: 12px;color: #e54847;}
</style>
