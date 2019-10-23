<template>
  <div class="quote-container">
    <input v-on:keyup="filterProgrammingQuotes" v-model="searchTerm" id="search">
    <table class="uk-table uk-table-striped uk-table-middle">
      <thead>
        <tr>
          <th v-on:click="sortAuthors">author</th>
          <th v-on:click="sortQuotes">quote</th>
          <th v-on:click="sortRatings">rating</th>
        </tr>
      </thead>
      <tbody id="tableData">
        <tr v-for="(programmingQuote, i) in programmingQuotes" v-bind:key="i">
          <td>{{programmingQuote.author}}</td>
          <td>"{{programmingQuote.en}}"</td>
          <td>{{programmingQuote.rating}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
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
    loadTableData() {
      fetch(`https://programming-quotes-api.herokuapp.com/quotes`)
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;
          console.log(this.programmingQuotes);
        });
    },
    filterProgrammingQuotes() {
      this.programmingQuotes = this.programmingQuotes.filter(
        programmingQuote => {
          let authorString = programmingQuote["author"].toLowerCase();
          console.log(authorString.indexOf(this.searchTerm));

          return authorString.indexOf(this.searchTerm) !== -1;
        }
      );
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.quote-container {
  width: 80%;
  height: 80vh;
}

th {
  text-align: center;
}
</style>
