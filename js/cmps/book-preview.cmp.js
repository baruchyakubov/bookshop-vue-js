export default {
    props:['book'],
    template: `
        <section class="book-preview">
            <img :src="imgUrl" alt="" />
            <h2>{{ book.title }}</h2>
            <h3>{{ createPriceFormat }}</h3>
        </section>
    `,
   computed:{
    imgUrl(){
        return this.book.thumbnail
    },
    createPriceFormat(){
        let currency = this.book.listPrice.currencyCode
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
          })
          return formatter.format(this.book.listPrice.amount)
    }
   }
}