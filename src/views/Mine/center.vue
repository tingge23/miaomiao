<template>
    <div>
        <h2>个人中心: </h2>
        <div>当前用户:{{ $store.state.user.name}}  <a href="javascript:;" @click="handleToLogout">退出</a></div> <!-- 防止点击a连接跳转 -->
        <div v-if="$store.state.user.isAdmin"> 用户身份：管理员<!-- <a href="/admin" target="_blank">进入管理后台</a> --></div>
        <div v-else>用户身份：普通会员 <a href="/admin" target="_blank" >进入管理后台</a></div>
        <div>
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : 'center',
    methods:{
        handleToLogout(){
        //console.log('退出')
            this.axios.get('/api2/users/logout').then((res)=>{
                // console.log(res)
                var status = res.data.status;
                if(status === 0){
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME',{name : '' , isAdmin : false , userHead : '' }); 
                    this.$router.push('/mine/login')
                }
            });
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/users/getUser').then((res)=>{
            var status = res.data.status;
            if(status === 0){
                 next(vm=>{
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{
                        name:res.data.data.username,
                        isAdmin:res.data.data.isAdmin,
                        userHead : res.data.data.userHead + '?' + Math.random()});
                });
               
            }else{
                next('/mine/login');
            }
        });
}
    
}
</script>

<style scoped>
.userHead{ width:100px; height:100px; border-radius: 50%; overflow: hidden;}
</style>
