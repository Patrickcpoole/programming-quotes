<template>
  <div class="container">
    <div class="quote-container">
      <div class="header">
        <router-link tag="a" :to="{ name: 'quoteContainer'}">
          <h1>Programming Quotes</h1>
        </router-link>
      </div>

      <p>
        "{{programmingQuote.en}}" -
        <b>
          <i>{{programmingQuote.author}}</i>
        </b>
      </p>
      <div class="info-container">
        <div class="rating-container">
          <h3>Rating:</h3>
          <div class="stars-outer">
            <div class="stars-inner"></div>
          </div>
        </div>

        <h3>Number of Votes: {{programmingQuote.numberOfVotes}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quote",
  props: {},
  data() {
    return {
      programmingQuote: [],
      authorData: {},
      id: this.$route.params.id,
      author: null
    };
  },
  methods: {
    async loadQuoteData() {
      await fetch(
        `https://programming-quotes-api.herokuapp.com/quotes/id/${this.id}`
      )
        .then(response => response.json())
        .then(data => {
          this.programmingQuote = data;
          console.log(this.programmingQuote);
        });
    },

    setStars() {
      const starTotal = 5;

      const rating = this.programmingQuote.rating;

      console.log(this.programmingQuote.rating);

      const starPercentage = (rating / starTotal) * 100;

      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      document.querySelector(
        ".stars-inner"
      ).style.width = starPercentageRounded;
    }
  },

  mounted() {
    this.loadQuoteData();
  },

  updated() {
    this.setStars();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #fff;
  font-size: 1.5em;

  margin-top: 0.75em;
}

a {
  color: #fff;
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

.header {
  width: 100%;
  height: 4em;
  background: #333;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15em;
}

.content-conatiner {
}

p {
  margin-right: 15em;
  margin-left: 15em;
  font-size: 1.5rem;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.rating-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -3em;
}

h3 {
  margin-right: 0.5em;
  font-size: 1.25rem;
}

.stars-outer {
  display: inline-block;
  position: relative;
  font-family: FontAwesome;
  margin-left: 0.5em;
  margin-bottom: 1em;
  font-size: 1.5rem;
}

.stars-outer::before {
  content: "\f006 \f006 \f006 \f006 \f006";
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  color: #f8ce0b;
}
</style>
