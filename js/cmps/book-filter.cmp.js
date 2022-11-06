export default {
    template: `
        <section class="book-filter">
            <input 
                class="search"
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search">

            <div>max-price:<input 
                @input="filter"
                min=19
                max=186
                title="this.value"
                v-model="filterBy.maxPrice" 
                type="range" 
                placeholder="Search"></div>
        </section>
    `,

    data() {
        return {
            filterBy: {
                name: '',
                maxPrice: 186
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}