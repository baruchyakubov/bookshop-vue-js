import { bookService } from "../services/book-service.js"
import { utilService } from "../services/storage-service.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    props: ['book'],
    template: `
    <h3>Add A Review</h3>
    <form action="">
        <label htmlFor="">
            <p>fullname:</p>
            <input 
            v-model="fullname" 
            ref="fullname" 
            type="text"/>
        </label>
           
        <label htmlFor="">
            <p>rate:</p>
            <input 
            v-model="rate"
            type="range" 
            min=0 max=5 />
            <span>{{ rate }}</span>
        </label>

        <label htmlFor="">
            <p>read at:</p>
            <input 
            v-model="date"
            type="date" 
            min=0 max=5 />
        </label>

        <label htmlFor="">
            <p>add a comment:</p>
            <textarea  
            v-model="comment"
            name="" id="" 
            cols="30" rows="10"
            placeholder="add a comment"></textarea>
        </label>
        <button class="save" @click="saveReview">save review</button> 
    </form>
    <h3>reviews</h3>
    <div class="review" v-for="review in book.reviews">
        <h3>name: {{ review.fullname }}</h3>
        <h4>read at: {{ review.date }}</h4>
        <h4>rate: {{ review.rate }}</h4>
        <p>comment: {{ review.comment }}</p>
        <button @click="deleteReview(review.id)">delete</button>
    </div>
    `,
    data() {
        return {
            fullname: 'Books Reader',
            rate: 0,
            date: new Date().toISOString().slice(0, 10),
            comment: ''
        }
    },
    mounted() {
        this.$refs.fullname.focus()
    },
    methods: {
        saveReview() {
            this.book.reviews.push({
                id: utilService.makeId(),
                fullname: this.fullname,
                rate: this.rate,
                date: this.date,
                comment: this.comment
            })
            bookService.save(this.book)
                .then(() => {
                    this.fullname = 'Books Reader',
                    this.rate = 0,
                    this.date = new Date().toISOString().slice(0, 10),
                    this.comment = ''
                    const msg = {
                        txt: `review saved`,
                        type: 'success',
                        timeout: 4000,
                    }
                    eventBus.emit('user-msg', msg)
                })
        },
        deleteReview(reviewId) {
            var idx = this.book.reviews.findIndex(review => {
                review.id === reviewId
            })
            this.book.reviews.splice(idx, 1)
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: `review deleted`,
                        type: 'success',
                        timeout: 4000,
                    }
                    eventBus.emit('user-msg', msg)
                })
        }
    }
}