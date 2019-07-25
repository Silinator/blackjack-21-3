class Card {
  constructor( card ) {
    let suite = card[0].toLowerCase();
    let value = card[1];
    this.suite = suite;
    this.value = value;
  }

  display( cardtype ) {
    switch (this.value) {
      case 1:   var number = "A"; break;
      case 11:  var number = "J"; break;
      case 12:  var number = "Q"; break;
      case 13:  var number = "K"; break;
      default:  var number = this.value; break;
    }

    return "<card data-value='"+this.value+"' class='card-suite-"+this.suite+ " "+cardtype+" card-value-"+this.value+"'>" +
        "<div class='card-corner card-corner-tl'>" +
          "<div class='card-number'>"+number+"</div>" +
          "<div class='card-symbol'></div>" +
        "</div>" +
        "<div class='card-center'>" +
          "<div class='card-main-symbol card-symbol c-p1'></div>" +
          "<div class='card-main-symbol card-symbol c-p2'></div>" +
          "<div class='card-main-symbol card-symbol c-p3'></div>" +
          "<div class='card-main-symbol card-symbol c-p31'></div>" +
          "<div class='card-main-symbol card-symbol c-p4'></div>" +
          "<div class='card-main-symbol card-symbol c-p5'></div>" +
          "<div class='card-main-symbol card-symbol c-p6'></div>" +
          "<div class='card-main-symbol card-symbol c-p7'></div>" +
          "<div class='card-main-symbol card-symbol c-p8'></div>" +
          "<div class='card-main-symbol card-symbol card-mirror c-p9'></div>" +
          "<div class='card-main-symbol card-symbol card-mirror c-p10'></div>" +
          "<div class='card-main-symbol card-symbol card-mirror c-p11'></div>" +
          "<div class='card-main-symbol card-symbol card-mirror c-p12'></div>" +
          "<div class='card-main-symbol card-symbol card-mirror c-p13'></div>" +
        "</div>" +
        "<div class='card-corner card-mirror card-corner-br'>" +
          "<div class='card-number'>"+number+"</div>" +
          "<div class='card-symbol'></div>" +
        "</div>" +
      "</card>";
  }
}

class Deck {

  constructor( size ) {
    var i = 0;
    this.deck = [];
    while ( i < size ) {
      const suites = [ 'heart', 'club', 'diamond', 'spade' ];
      const values = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];

      suites.forEach( suite => {
        values.forEach( value => {
          this.deck.push( [suite, value ] );
        })
      })
      i++;
    }
    this.shuffle();
  }

  shuffle() {
    var j, x, i;
    var a = this.deck;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    this.deck = a;
  }

  draw() {
    let drawcard = this.deck[0];
    this.deck.splice( 0, 1 );
    return drawcard;
  }
}

class Game {

  constructor( players ) {
    this.players = players;
    this.playerMove = 1;
  }

  start(){
    this.deck = new Deck( 4 );
    this.giveCard( 1 ); // player
    this.giveCard( 2 ); // dealer
    this.giveCard( 1 ); // player
  }

  giveCard( player, cardtype = 'normal' ){
    let playercard = new Card( this.deck.draw() );
    console.log( playercard );
    $('.player' + player + ' .playercards' ).append( playercard.display( cardtype ) );

    // count
    let counter = $('.player' + player + ' .counter' );
    let oldTotal =  parseInt( counter.html() );

    let addTotal = playercard.value;

    if( playercard.value === 11 || playercard.value === 12 || playercard.value === 13 ){
      addTotal = 10;
    }

    if( playercard.value === 1 ){
      if( oldTotal + 11 > 21 ){
        addTotal = 1;
      } else {
        addTotal = 11;
      }
    }

    if( counter.attr('data-cards') ){
      counter.attr('data-cards', counter.attr('data-cards') + ", " + playercard.value );
    }else{
      counter.attr('data-cards', playercard.value );
    }

    let newsum = oldTotal + addTotal;

    counter.attr( 'data-count', newsum );
    counter.html( newsum );

    return newsum;
  }

  count( player ) {
    let counter = $('.player' + player + ' .counter' ).attr('data-cards');
    let cards = counter.split(', ');

    let newsum = oldTotal + addTotal;
  }

  nextplayer( player ){
    if( player < this.players ){
      this.playerMove++;
    }else{
      this.playerMove = 2;
      this.dealerRun();
    }
  }

  stand( player ) {
    if( this.playerMove === player )
    {
      this.nextplayer();
    }
  }

  hit( player ) {
    if( this.playerMove === player )
    {
      if( this.giveCard( 1 ) > 21 ){
        this.bust( player );
      }
    }
  }

  double( player ) {
    if( this.playerMove === player )
    {
      this.giveCard( 1, 'rotate' );
      this.nextplayer();
    }
  }

  split( player ) {
    if( this.playerMove === player ) // TODO:  if split is posible
    {
      console.log( 'split' );
    }
  }

  bust( player ){
    console.log( player + 'bust' );
    this.nextplayer();
  }

  dealerRun() {
    console.log( 'dealer' );
  }

}

var blackJack = new Game( 1 );

blackJack.start();

$('.stand-btn').click( () => {  blackJack.stand( 1 ) } );
$('.hit-btn').click( () => {    blackJack.hit( 1 ) } );
$('.split-btn').click( () => {  blackJack.split( 1 ) } );
$('.double-btn').click( () => { blackJack.double( 1 ) } );
