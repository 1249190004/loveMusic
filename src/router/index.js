import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../components/content/home/Home'),
    redirect: '/find',
    children: [
      {
        path: '/find',
        component: () => import('../views/findMusic/FindMusic')
      },
      {
        path: '/ranking',
        component: () => import('../views/ranking/Ranking')
      },
      {
        path: '/singer',
        component: () => import('../views/singer/Singer')
      },
      {
        path: '/singSheet',
        component: () => import('../views/singSheet/SingSheet')
      },
      {
        path: '/radioStation',
        component: () => import('../views/radioStation/RadioStation')
      },
      {
        path: '/newMusic',
        component: () => import('../views/newMusic/NewMusic')
      },
      {
        path: '/playHistory',
        component: () => import('../views/playHistory/PlayHistory')
      },
      {
        path: '/requestFail',
        component: () => import('../components/content/requestFail/RequestFail')
      },
      {
        path: '/playListDetail',
        component: () => import('../views/playlistDetail/PlayListDetail')
      },
      {
        path: '/radioDetail',
        component: () => import('../views/radioDetail/RadioDetail')
      },
      {
        path: '/menu',
        component: () => import('../components/content/menu/Menu'),
        redirect: '/playMusicDetail',
        children: [
          {
            path: '/playMusicDetail',
            component: () => import('../components/common/playMusicDetail/PlayMusicDetail')
          },
          {
            path: '/album',
            component: () => import('../views/album/Album')
          },
          {
            path: '/searchSinger',
            component: () => import('../views/searchSinger/SearchSinger')
          },
          {
            path: '/recommendSongSheet',
            component: () => import('../components/common/recommend/RecommendSongSheet')
          },
          {
            path: '/video',
            component: () => import('../views/video/Video')
          }
        ]
      },
      {
        path: '/videoDetail',
        component: () => import('../views/videoDetail/VideoDetail')
      },
      {
        path: '/singerDetail',
        component: () => import('../views/singerDetail/SingerDetail')
      }

    ]
  },
  {
    path: '/login',
    component: () => import('../components/common/login/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
