const state= {
    nm : window.localStorage.getItem('nowNm') || '北京',
    id : window.localStorage.getItem('nowId') || 1,
};
const actions = {

};
const mutations ={ //修改状态的方法
    CITY_INFO(state, payload){
        state.nm = payload.nm;
        state.id = payload.id;
    }

};
export default {
    namespaced: true ,//命名空间 设置了namespaced属性的模块将和其它模块独立开来，调用时得指定命名空间后才可//以访问得到
    state,
    actions,
    mutations
}