let books = new Vue({
    el: '#app',
    data: {
        search: '',
        loading: false,
        tempTitle: [],
        title: '',
        docs: [],
        data: {},
        isbnNumber: '',
        thumbURL: '',
        isbnArray: [],
        favBook: [{
            title: '',
        }],
        show: 'all',

    },
    created() {
        this.book()
    },
    methods: {
        async book() {
            try {
                this.loading = true;
                const response = await axios.get('http://openlibrary.org/search.json?q=' + this.title);
                const isbnResponse = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.isbnNumber + '&jscmd=details&format=json');
                console.log("response: ", response);
                console.log("isbn: ", isbnResponse);
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
        async searchBooks() {
            try {
                this.title = this.search;
                this.tempTitle = this.title.split(" ");
                this.title = "";
                for (let i = 0; i < this.tempTitle.length - 1; i++) {
                    this.title += this.tempTitle[i] + '+';
                }
                this.title += this.tempTitle[this.tempTitle.length - 1];
                const response = await axios.get('http://openlibrary.org/search.json?q=' + this.title);
                console.log("response: ", response);
                this.data = response.data;

                this.getThumbnail();
            }
            catch(error) {
                console.log(error);
                this.loading = false;
                return false;
            }
        },
        async getThumbnail() {
            try {
                for (i = 0; i < this.data.docs.length; i++) {
                    if (this.data.docs[i].isbn) {
                        this.isbnNumber = this.data.docs[i].isbn[0];
                        const isbnResponse = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.isbnNumber + '&jscmd=details&format=json');
                        this.thumbURL = isbnResponse.data;
                        //console.log("isbn: ", isbnResponse);
                        this.isbnArray.push(this.isbnNumber);
                        
                    }
                }  
                
                console.log(this.isbnArray);
            }
            catch(error) {
                console.log(error);
                this.loading = false;
                return false;
            }
        },
        favoriteBook() {
        },
        showAll() {
            this.show = 'favorite';
        },
    },
    computed: {
        showFav() {
            if (this.show === 'favorite') {
                for (let i = 0; i < favBook.length; i++){
                    return this.favBook[i]
                }
            }
        }
    }

});
