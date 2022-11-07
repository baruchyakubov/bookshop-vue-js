const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

import bookApp from './cmps/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'

import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

import userMsg from './cmps/user-msg.cmp.js'

const options = {
    template: `
         <section>
            <app-header />
            <user-msg />
            <router-view />
            <app-footer />
        </section>
    `,
      components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    }
}

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: bookApp,
            children: [
                { path: ':id', component: bookDetails }
              ]
        },
        {
            path: '/about',
            component: aboutPage
        },
    ]
}

const app = createApp(options)
const router = createRouter(routerOptions)

app.use(router)
app.mount('#app')