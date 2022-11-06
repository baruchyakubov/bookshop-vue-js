import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <article @click="showDetails(book)" v-for="book in books" :key="book.id">
                <book-preview :book="book"/>
            </article>
           
        </section>
    `,
      methods: {
        showDetails(book){
            this.$emit('selected', book)
        }
    },

    components: {
        bookPreview
    }

}