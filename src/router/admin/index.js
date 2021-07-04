export default{
    path:'/admin',
    component : () =>import('@/views/Admin'),   //@表示src路径
    children:[
        {
            path:'user',
            component :()=>import('@/views/Admin/users.vue')
        },
        {
            path:'movie',
            component :()=>import('@/views/Admin/movie.vue')
        },
        {
            path:'cinema',
            component :()=>import('@/views/Admin/cinema.vue')
        },
        {
            path:'/admin',
            redirect :'users'
        }
    ]
}