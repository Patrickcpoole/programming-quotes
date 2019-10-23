<template>
  <div class="container">
    <div class="quote-container">
      <h1>{{programmingQuote.author}}</h1>
      <p>{{programmingQuote.en}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: {},
  data() {
    return {
      programmingQuote: [],
      id: this.$route.params.id
    };
  },
  methods: {
    async loadAuthorData() {
      await fetch(
        `https://programming-quotes-api.herokuapp.com/quotes/id/${this.id}`
      )
        .then(response => response.json())
        .then(data => {
          this.programmingQuote = data;
        });
    }
  },
  mounted() {
    this.loadAuthorData();
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
