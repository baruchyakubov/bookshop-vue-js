import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            
            <article v-for="book in books" :key="book.id">
                <router-link :to="'/book/' + book.id">
                    <book-preview :book="book"/>
                </router-link>
            </article>
        </section>
    `,
    components: {
        bookPreview
    }

}