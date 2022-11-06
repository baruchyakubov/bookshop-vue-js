import { bookService } from "../services/book-service.js"

import bookFilter from './book-filter.cmp.js'
import bookList from './book-list.cmp.js'
import bookDetails from './book-details.cmp.js'

export default {
    template: `
    <section class="book-app">
        <div v-if="selectedBook" class="page-opacity"></div>
        <book-filter @filter="filter"/>
        <book-list 
            @selected="selectBook"  
            :books="booksToShow"/>

        <book-details 
            @close="selectedBook= null" 
            v-if="selectedBook" 
            :book="selectedBook"/>
    </section>
    `,
    data(){
        return {
            books:[],
            selectedBook: null,
            filterBy: {name: '' , maxPrice: 186},
        }
    },
    created(){
        this.books = bookService.query()
        console.log(this.books);
    },
    computed:{
        booksToShow(){
            const regex = new RegExp(this.filterBy.name, 'i')
            console.log(this.filterBy.maxPrice);
            return this.books.filter(book => regex.test(book.title) &&
             book.listPrice.amount <= this.filterBy.maxPrice) 
        }
    },
    methods:{
        selectBook(book){
            this.selectedBook = book
        },
        filter(filterBy){
            this.filterBy = filterBy
        }
    },
    components:{
        bookList,
        bookDetails,
        bookFilter
    }
}