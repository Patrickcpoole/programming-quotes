<template>
  <div class="container">
    <div class="quote-container">
      <h1>This is the Author component</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: {
    msg: String
  },
  data() {
    return {
      programmingQuotes: [],
      sortAuthorDirection: false,
      sortQuotesDirection: false,
      sortRatingsDirection: false,
      searchTerm: null
    };
  },
  methods: {
    async loadTableData() {
      await fetch(`https://programming-quotes-api.herokuapp.com/quotes/page/1`)
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;
          console.log(this.programmingQuotes);
        });
    },
    async paginatePage(number) {
      await fetch(
        `https://programming-quotes-api.herokuapp.com/quotes/page/${number}`
      )
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;
          console.log(this.programmingQuotes);
        });
    },
    filterProgrammingQuotes() {
      let tbody = document.getElementById("tableData");
      let tr = tbody.getElementsByTagName("tr");
      this.programmingQuotes.forEach((programmingQuote, i) => {
        if (
          programmingQuote["author"].toLowerCase().indexOf(this.searchTerm) > -1
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      });
    },

    sortAuthors() {
      this.sortAuthorDirection = !this.sortAuthorDirection;

      this.programmingQuotes = this.programmingQuotes.sort((a, b) => {
        return this.sortAuthorDirection
          ? a["author"] > b["author"]
            ? 1
            : -1
          : a["author"] < b["author"]
          ? 1
          : -1;
      });
      console.log(this.programmingQuotes);
    },
    sortQuotes() {
      this.sortQuotesDirection = !this.sortQuotesDirection;

      this.programmingQuotes = this.programmingQuotes.sort((a, b) => {
        return this.sortQuotesDirection
          ? a["en"] > b["en"]
            ? 1
            : -1
          : a["en"] < b["en"]
          ? 1
          : -1;
      });
    },
    sortRatings() {
      this.sortRatingsDirection = !this.sortRatingsDirection;

      this.programmingQuotes = this.programmingQuotes.sort((a, b) => {
        return this.sortRatingsDirection
          ? a["rating"] > b["rating"]
            ? 1
            : -1
          : a["rating"] < b["rating"]
          ? 1
          : -1;
      });
    }
  },
  mounted() {
    this.loadTableData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #000;
  font-size: 1.5em;
  margin-left: 1.5em;
  margin-top: 0.75em;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    rgba(13, 160, 55, 0.8),
    rgba(14, 183, 196, 0.6)
  );
  background-size: cover;
  min-height: 100vh;
}
.quote-container {
  width: 80%;
  min-height: 90vh;
  margin-top: 2em;
  margin-bottom: 2em;
  background: white;
  border-radius: 5px;
}
</style>
