import { bookService } from "../services/book-service.js"

import bookFilter from './book-filter.cmp.js'
import bookList from './book-list.cmp.js'


export default {
    template: `
    <section class="book-app grid-container">
        
        <book-filter @filter="filter"/>
        <book-list v-if="books" 
            @selected="selectBook"  
            :books="booksToShow"/>


            <router-view ></router-view >
    </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: { name: '', maxPrice: 186 },
        }
    },
    created() {
         bookService.query()
                .then(books => {
                    this.books = books
                })
    },
    computed: {
        booksToShow() {
            const regex = new RegExp(this.filterBy.name, 'i')
            console.log(this.filterBy.maxPrice);
            return this.books.filter(book => regex.test(book.title) &&
                book.listPrice.amount <= this.filterBy.maxPrice)
        }
    },
    methods: {
        filter(filterBy) {
            this.filterBy = filterBy
        }
    },
    components: {
        bookList,
        bookFilter
    }
}