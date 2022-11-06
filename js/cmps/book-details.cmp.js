

export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3 :class="setColor">{{ createPriceFormat }}</h3>
            <h3><span>{{ pageCount }}</span>,
            <span>{{ publishedDate }}</span></h3>
            <p>{{ book.description }}</p>
            <button @click="$emit('close')">Close</button>
        </section>
    `,
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
        }
    }

}
