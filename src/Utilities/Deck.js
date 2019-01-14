class Deck {
  constructor() {
    this.deck = [];

    const values = ['Ace', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'J', 'Q', 'K'];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    for (let value in values) {
      for (let suit in suits) {
        this.deck.push(`${values[value]} of ${suits[suit]}`);
      }
    }
  }

  // Shuffle method taken from https://bost.ocks.org/mike/shuffle/
  shuffle() {
    const { deck } = this;

    let i = deck.length;
    let j;

    while (i) {
      j = Math.floor(Math.random() * i--);
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return this;
  }

  dealCard() {
    return this.deck.pop();
  }
}

export default Deck;
