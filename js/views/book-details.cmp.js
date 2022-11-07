import { bookService } from "../services/book-service.js"
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
    template: `
    <div v-if="book"  class="page-opacity"></div>
        <section v-if="book"  class="book-details">
        <router-link to="/book"><button>Close</button></router-link> 
            <h2>{{ book.title }}</h2>
            <h3 :class="setColor">{{ createPriceFormat }}  <span class="green">{{ isOnSale }}</span></h3>
            <h3><span>{{ pageCount }}</span>,
            <span>{{ publishedDate }}</span></h3>
            <p>{{ checkCharCount }}<span v-if="isClicked">{{ restDes }}
                    <button @click="removeResDes">read less</button>
                </span>
                <button @click="showRestDes" v-if="isLong">read more</button>
                </p>
                <review-add :book="book">   
        </section>
    `,
    data() {
        return {
            restDes: '',
            isLong: false,
            isClicked: false,
            book: null
        }
    },
    created(){
        const id = this.$route.params.id
        bookService.get(id)
            .then(book => this.book = book)
    },
    methods:{
        showRestDes(){
            this.isLong = false
            this.isClicked = true
        },
        removeResDes(){
            this.isLong = true
            this.isClicked = false
        }
    },
    computed: {
        pageCount() {
            if (this.book.pageCount > 500) return 'Long Reading'
            else if (this.book.pageCount > 200 && this.book.pageCount < 100) return ''
            else return 'Light Reading'
        },

        publishedDate() {
            var today = new Date()
            var currYear = today.getFullYear()
            if (currYear - this.book.publishedDate > 10) return 'Veteran Book'
            else if (currYear - this.book.publishedDate < 1) return 'New!'
            else return ''
        },
        createPriceFormat() {
            let currency = this.book.listPrice.currencyCode
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
            })
            return formatter.format(this.book.listPrice.amount)
        },
        setColor() {
            return {
                red: this.book.listPrice.amount > 150,
                green: this.book.listPrice.amount < 20
            }
        },
        checkCharCount() {
            if (this.book.description.length > 100) {
                this.isLong = true
                this.restDes = this.book.description.slice(100, this.book.description.length - 1)
                return this.book.description.slice(0, 100)
            }
            this.isLong = false
            return this.book.description
        },
        isOnSale(){
            if(this.book.listPrice.isOnSale) return 'ON SALE'
            return ''
        }
    },
    components:{
        reviewAdd
    }

}
