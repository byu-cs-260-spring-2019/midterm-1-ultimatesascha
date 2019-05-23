let books = new Vue({
    el: '#books',
    data: {
        search: '',
        loading: true,
        tempTitle: [],
        title: '',
        docs: [],
        data: {},
    },
    created() {
        this.book()
    },
    methods: {
        async book() {
            try {
                this.loading = true;
                const response = await axios.get('http://openlibrary.org/search.json?q=' + this.title);
                console.log("response: ", response);
                this.data = response.data;
                this.loading = false;
                this.docs = response.data.docs;
                return true;
            }
             catch(error) {
                console.log(error);
                this.loading = false;
                return false;
            }
        },
        searchBooks() {
            this.title = this.search;
            this.tempTitle = this.title.split(" ");
            this.title = "";
            for (let i = 0; i < this.tempTitle.length - 1; i++) {
                this.title += this.tempTitle[i] + '+';
            }
            this.title += this.tempTitle[this.tempTitle.length - 1];
            axios.get('http://openlibrary.org/search.json?q=' + this.title);

        }
    },

});