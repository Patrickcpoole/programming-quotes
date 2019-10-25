<template>
  <div class="pagination-container">
    <ul class="uk-pagination uk-flex-center">
      <li>
        <a v-on:click="paginatePage('previous')">
          <span uk-pagination-previous></span>
        </a>
      </li>
      <p>Page {{pageIndex}}</p>
      <li>
        <a v-on:click="paginatePage('next')">
          <span uk-pagination-next></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["quoteData"],
  data() {
    return {
      programmingQuotes: [],
      pageIndex: 1
    };
  },
  methods: {
    async paginatePage(direction) {
      let page = this.pageIndex;
      page > 24 ? (page = 0) : null;
      direction === "next" ? page++ : page--;

      await fetch(
        `https://programming-quotes-api.herokuapp.com/quotes/page/${page}`
      )
        .then(response => response.json())
        .then(data => {
          this.programmingQuotes = data;
          this.$emit("paginationOccured", this.programmingQuotes);
        });
      this.pageIndex = page;
    }
  }
};
</script>


<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;
  margin-left: 3.5em;
}

span {
  margin-top: 1.5em;
  color: white;
}

p {
  margin-top: 1.1em;
}
</style>
