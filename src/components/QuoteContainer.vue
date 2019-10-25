<template>
  <div class="container">
    <div class="quote-container">
      <div class="header">
        <Pagination
          v-bind:quoteData="programmingQuotes"
          @paginationOccured="programmingQuotes = $event"
        />
        <h1>Programming Quotes</h1>
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
            <div class="th-author">
              <th v-on:click="sortBy('author')">author</th>
              <i class="arrow down"></i>
            </div>
            <div class="th-en">
              <th v-on:click="sortBy('en')">quote</th>
              <i class="arrow down"></i>
            </div>
            <div class="th-rating">
              <th v-on:click="sortBy('rating')">rating</th>
              <i class="arrow down"></i>
            </div>
          </tr>
        </thead>

        <tbody id="tbody">
          <tr v-for="(programmingQuote, i) in programmingQuotes" v-bind:key="i">
            <router-link
              tag="a"
              :to="{ name: 'quote', params: {id: programmingQuote.id } }"
              v-bind:id="programmingQuote.id"
            >
              <div class="table-data">
                <td id="author">{{programmingQuote.author}}</td>

                <td id="en-quote">"{{programmingQuote.en}}"</td>

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
import Pagination from "./Pagination";
export default {
  name: "QuoteContainer",

  components: {
    Pagination
  },
  data() {
    return {
      programmingQuotes: [],
      sortDirection: false,
      searchTerm: null
    };
  },
  methods: {
    async loadTableData() {
      await fetch(`https://programming-quotes-api.herokuapp.com/quotes/page/1`)
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;

          // filters out quotes that aren't rated
          this.programmingQuotes = this.programmingQuotes.filter(
            programmingQuote => {
              return programmingQuote.rating;
            }
          );
        });
    },

    async filterProgrammingQuotes() {
      const tbody = document.getElementById("tbody");
      const tr = tbody.getElementsByTagName("tr");

      this.programmingQuotes.forEach((programmingQuote, i) => {
        if (
          programmingQuote["author"].toLowerCase().indexOf(this.searchTerm) >
            -1 ||
          programmingQuote["en"].toLowerCase().indexOf(this.searchTerm) > -1
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      });
    },

    sortBy(heading) {
      this.sortDirection = !this.sortDirection;

      const arrow = document.querySelector(`.th-${heading} > i`);

      if (this.sortDirection) {
        arrow.classList.remove("down");
        arrow.classList.add("up");
      } else {
        arrow.classList.remove("up");
        arrow.classList.add("down");
      }

      if (heading == "rating") {
        this.programmingQuotes = this.programmingQuotes.sort((a, b) => {
          if (this.sortDirection) {
            if (a[heading] < b[heading]) {
              return 1;
            } else {
              return -1;
            }
          } else {
            if (a[heading] > b[heading]) {
              return 1;
            } else {
              return -1;
            }
          }
        });
      } else {
        this.programmingQuotes = this.programmingQuotes.sort((a, b) => {
          if (this.sortDirection) {
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
    }
  },
  mounted() {
    this.loadTableData();
  }
};
</script>


<style scoped>
h1 {
  color: #fff;
  font-size: 1.5em;
  margin-left: 1.5em;
  margin-top: 0.75em;
}

th {
  padding-left: 3em;
  padding-right: 2.5em;
  color: #000;
  font-size: 1.15rem;
  font-weight: 500;
}

th:hover {
  cursor: pointer;
}

i {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  margin-left: -2em;
  margin-bottom: 0.25em;
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

td {
  padding-left: 3.5em;
  padding-right: 3.5em;
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
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.4);
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

.th-author {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.th-en {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.th-rating {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 2em;
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.active {
  color: white;
}
</style>
