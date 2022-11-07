export default {
    template: `
        <header class="app-header">
            <div class="grid-container">
            <h1 class="logo">BOOK-SHOP</h1>
            <nav :class="setMenuDisplay" class="navigation-bar">
            <router-link to="/">Home</router-link>
                <router-link to="/book">Cars</router-link>
                <router-link to="/about">About</router-link>
            </nav>
            <img @click="toggleMenu" class="menu" src="img/menu.png" alt="" />
            </div>
          
        </header>
    `,
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = (this.isMenuOpen) ? false : true
        }
    },
    computed:{
        setMenuDisplay(){
            return {opened: this.isMenuOpen}
        }
    }
}