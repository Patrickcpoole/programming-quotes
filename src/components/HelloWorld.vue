<template>
  <div class="container">
    <div class="quote-container">
      <div class="header">
        <h1>Programming Quotes</h1>
        <ul class="uk-pagination uk-flex-center">
          <li>
            <a v-on:click="paginatePage('1')">1</a>
          </li>
          <li>
            <a v-on:click="paginatePage('2')">2</a>
          </li>
          <li>
            <a v-on:click="paginatePage('3')">3</a>
          </li>
          <li>
            <a v-on:click="paginatePage('4')">4</a>
          </li>
          <li>
            <a v-on:click="paginatePage('5')">5</a>
          </li>
          <li>
            <a v-on:click="paginatePage('6')">6</a>
          </li>
          <li>
            <a v-on:click="paginatePage('7')">7</a>
          </li>
          <li>
            <a v-on:click="paginatePage('8')">8</a>
          </li>
          <li>
            <a v-on:click="paginatePage('9')">9</a>
          </li>
          <li>
            <a v-on:click="paginatePage('10')">10</a>
          </li>
        </ul>
        <input
          v-on:keyup="filterProgrammingQuotes"
          v-model="searchTerm"
          placeholder="Search"
          type="text"
        >
      </div>

      <table class="uk-table uk-table-divider uk-table-middle uk-table-hover">
        <thead>
          <tr class="top-row">
            <th v-on:click="sortBy('author')">author</th>
            <th v-on:click="sortBy('en')">quote</th>
            <th v-on:click="sortBy('rating')">rating</th>
          </tr>
        </thead>

        <tbody id="tbody">
          <tr v-for="(programmingQuote, i) in programmingQuotes" v-bind:key="i">
            <router-link
              tag="a"
              :to="{ name: 'author', params: {id: programmingQuote.id, author:programmingQuote.author } }"
              v-bind:id="programmingQuote.id"
            >
              <div class="table-data">
                <td>{{programmingQuote.author}}</td>

                <td>"{{programmingQuote.en}}"</td>

                <td>{{programmingQuote.rating}}</td>
              </div>
            </router-link>
          </tr>
        </tbody>
      </table>
    </div>
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
    async loadTableData() {
      await fetch(`https://programming-quotes-api.herokuapp.com/quotes/page/1`)
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;
        });
    },
    async paginatePage(number) {
      await fetch(
        `https://programming-quotes-api.herokuapp.com/quotes/page/${number}`
      )
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;
        });
    },
    filterProgrammingQuotes() {
      let tbody = document.getElementById("tbody");
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

    sortBy(heading) {
      this.sortAuthorDirection = !this.sortAuthorDirection;

      this.programmingQuotes = this.programmingQuotes.sort((a, b) => {
        if (this.sortAuthorDirection) {
          if (a[heading] > b[heading]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[heading] < b[heading]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
  },
  mounted() {
    this.loadTableData();
  }
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.header {
  width: 100%;
  height: 4em;
  background: #333;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #fff;
  font-size: 1.5em;
  margin-left: 1.5em;
  margin-top: 0.75em;
}

input[type="text"] {
  padding: 5px;
  border: 2px solid #ccc;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-right: 3em;
}

input[type="text"]:focus {
  border-color: #333;
}

input[type="submit"] {
  padding: 5px 15px;
  background: #ccc;
  border: 0 none;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    rgba(216, 133, 222, 0.8),
    rgba(30, 183, 217, 0.6)
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

.top-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #333;
}

.table-data {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

th {
  padding-left: 3em;
  padding-right: 3em;
  color: #000;
}

td {
  padding-left: 3em;
  padding-right: 3em;
  font-size: 1rem;
  list-style-type: none;
  color: #333;
  text-decoration: none;
  text-align: left;
}

tr > a:hover {
  list-style-type: none;
  color: black;
  text-decoration: none;
}
</style>
