export default{
    path:'/movie',
    component : () =>import('@/views/Movie'),   //@表示src路径
    children :[   //二级路由
        {
            path : 'city',
            component : () => import ('@/components/City')
        },
        {
            path : 'nowPlaying',
            component : () => import ('@/components/NowPlaying')
        },
        {
            path : 'comingSoon',
            component : () => import ('@/components/ComingSoon')
        },
        {
            path : 'search',
            component : () => import ('@/components/Search')
        },
        {
            path : '/movie',
            redirect: '/movie/nowPlaying'
        }

    ]
    
}