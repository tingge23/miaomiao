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
            path: 'detail/1/:movieId',
            components :{  //命名式路由
                default : ()=> import('@/components/NowPlaying'),
                detail:()=> import('@/views/Movie/detail')
            },
            props :{
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',
            components :{  //命名式路由
                default : ()=> import('@/components/ComingSoon'),
                detail:()=> import('@/views/Movie/detail')
            },
            props :{
                detail: true
            }
        },
        {
            path : '/movie',
            redirect: '/movie/nowPlaying'
        }

    ]
    
}