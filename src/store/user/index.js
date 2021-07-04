const state= {
    name : window.localStorage.getItem('name') ||'',
    isAdmin :  window.localStorage.getItem('isAdmin')||false,
    userHead :''
};
const actions = {

};
const mutations ={ //修改状态的方法
    USER_NAME(state, payload){
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.userHead=payload.userHead;
        
    }

};
export default {
    namespaced: true ,//命名空间 设置了namespaced属性的模块将和其它模块独立开来，调用时得指定命名空间后才可//以访问得到
    state,
    actions,
    mutations
}