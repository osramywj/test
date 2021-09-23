import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

const router =  new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: {title: '关于'},
        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: {title: '主页'},
            children: [
                {
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    meta: {title: '新闻'},
                    // beforeEnter(to, from,next) {
                    //     console.log('独享');
                    //     console.log(to, from, next);
                    //     next()
                    // }
                },
                {
                    name: 'xiaoxi',
                    path: 'message',
                    component: Message,
                    meta: {title: '消息'},
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail',
                            component: Detail,
                            // props: {a:1, b:2}
                            // props: true
                            meta: {title: '详情'},
                            props(route){
                                return {
                                    ...route.query,
                                    ...route.params
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

// router.beforeEach((to,from,next) => {
//     if (to.path === '/home/message' || to.path === '/home/news') {
//         if (localStorage.getItem('name') === 'yang') {
//             next()
//         }
//     } else {
//         next();
//     }
//     console.log(to,from);
// })

// router.afterEach((to, from) => {
//     document.title = to.meta.title;
// })

export default router;