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
    this.playedcards = 0;
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
    this.playedcards++;
    let drawcard = this.deck[0];
    this.deck.splice( 0, 1 );
    return drawcard;
  }
}

class Game {
  constructor( players ) {
    this.deck = new Deck( 6 );
    this.players = players;
    this.playerMove = 0;
  }

  start(){
    // new deck after half fulldeck is played
    if(this.deck.playedcards >= 3 * 52) {
      this.deck = new Deck( 6 );
    }

    //reset
    this.playerMove = 0;
    for (var i = 0; i <= this.players; i++) {
      $( ".player" + i + " .counter" ).html(0);
      $( ".player" + i + " .counter" ).attr( 'data-cards', '');
      $( ".player" + i + " .counter" ).attr( 'data-count', '0');
      $( ".player" + i + " .playercards" ).html('');
      $( ".player" + i + " .double-btn" ).removeClass('grayed-btn');
      $( ".player" + i + " .split-btn" ).addClass('grayed-btn');
      $( ".player" + i + " .splitplayerarea" ).remove();
      $( ".player" + i + " .counter" ).show();
      $( ".player" + i + " .playercards" ).show();
    }

    for (var i = 0; i < 2; i++) {
      for (var j = 1; j <= this.players; j++) {
        this.draw( j ); // player

        if( i === 1 ) { // can player split
          let counter = $('.player' + j + ' .counter' ).attr('data-cards');
          let cards = counter.split(', ');
          if( cards[0] === cards[1] ) {
            $( ".player" + j + " .split-btn" ).removeClass('grayed-btn');
          }
        }
      }

      if( i === 0 ) {
        this.draw( 0 ); // dealer
          //check sidebets
      }
    }

    //insurence | dealer shows ace
    if( $('.player0 .counter').attr('data-cards') == "1" ) {
      this.insurence();
    }

    //first player regular run
    this.nextplayer( true );
  }

  giveCard( player, cardtype = 'normal' ){
    let playercard = new Card( this.deck.draw() );
    $('.player' + player + ' .playercards' ).append( playercard.display( cardtype ) );

    // count
    let counter = $('.player' + player + ' .counter' );

    if( counter.attr('data-cards') ){
      counter.attr('data-cards', counter.attr('data-cards') + ", " + playercard.value );
    }else{
      counter.attr('data-cards', playercard.value );
    }

    let newsum = this.count( player )[0];
    let newsumtxt = this.count( player )[1];

    counter.attr( 'data-count', newsum );
    counter.html( newsumtxt );

    return newsum;
  }

  count( player ) {
    let counter = $('.player' + player + ' .counter' ).attr('data-cards');
    let cards = counter.split(', ');
    var totalValue = 0;

    for (var i = 0; i < cards.length; i++) {
      let cardValue = parseInt( cards[i] );
      var addTotal = cardValue;

      if( cardValue === 11 || cardValue === 12 || cardValue === 13 ){
        addTotal = 10;
      }

      if( cardValue === 1 ){
        addTotal = 11;
      }

      totalValue += addTotal;
    }

    var aces = cards.filter( (el) => {
      return el == 1
    });

    var try_val = totalValue;
    var ace_used = 0;

      for (var i = 0; i < aces.length; i++) {
        if( try_val > 21 ) {
          ace_used++;
          try_val = try_val - 10;
        }else{
          i = aces;
        }
      }

      if( aces.length > ace_used && try_val < 21 ) {
        var try_txt = try_val - 10 + "/" + try_val
      } else{
        var try_txt = try_val;
      }

      return [try_val, try_txt ];
  }

  stand( player ) {
    if( this.playerMove === player )
    {
      this.nextplayer();
    }
  }

  draw( player ) {
    this.giveCard( player );
  }

  hit( player ) {
    if( this.playerMove === player ) {
      var currentPlayerValue = this.giveCard( player )
      if( currentPlayerValue > 21 ) {
        this.bust( player );
      }else if( currentPlayerValue === 21) {
        this.nextplayer();
      }
    }
    $('.player' + player + ' .double-btn' ).addClass('grayed-btn');
  }

  double( player ) {
    if( this.playerMove === player )
    {
      if( $('.player' + player + ' .counter' ).attr('data-cards').split(', ').length === 2 ){
        this.giveCard( 1, 'rotate' );
        this.nextplayer();
      }
    }
  }

  split( player ) {
    if( this.playerMove === player ) // TODO:  if split is posible
    {
      let counter = $('.player' + player + ' .counter' ).attr('data-cards');
      let cards = counter.split(', ');
      if( cards[0] === cards[1] ) {
        if( player === Math.round( player) )
        {
          //first time split
          $('.player' + player + ' .betoption').before("<div class='splitplayerarea'></div>");
          $('.player' + player + ' .splitplayerarea').append("<div class='playerarea player"+ player + "-1'></div>");
          $('.player' + player + ' .splitplayerarea').append("<div class='playerarea player"+ player + "-2'></div>");

          let first_split = $('.player' + player + '-1' );
          let second_split = $('.player' + player + '-2' );

          let clone_counter = $('.player' + player + ' .counter');
          let clone_playercards = $('.player' + player + ' .playercards');

          first_split.append( clone_counter.clone() );
          first_split.append( clone_playercards.clone() );

          second_split.append( clone_counter.clone() );
          second_split.append( clone_playercards.clone() );

          //remove second
          first_split.find('card').eq(1).remove();
          second_split.find('card').eq(0).remove();

          //counter
          let first_split_counter = $('.player' + player + '-1 .counter');
          first_split_counter.attr('data-cards', first_split_counter.attr('data-cards').split(', ')[1] );

          let second_split_counter = $('.player' + player + '-2 .counter');
          second_split_counter.attr('data-cards', second_split_counter.attr('data-cards').split(', ')[0] );

          let first_counter = this.count( player + '-1' );
            first_split_counter.attr( 'data-count', first_counter[0] );
            first_split_counter.html( first_counter[1]  );

          let second_counter = this.count( player + '-2' );
            second_split_counter.attr( 'data-count', first_counter[0] );
            second_split_counter.html( first_counter[1]  );

          clone_counter.hide();
          clone_playercards.hide();

        } else {
          //if alredy splitted
        }
      }
    }
  }

  insurence() {
    for (var i = 1; i <= this.players; i++) {
      console.log( 'insurence' + i );
    }
  }

  bust( player ){
    this.nextplayer();
  }

  nextplayer( start = false ){
    if( this.playerMove !== 0 || start === true ) {
      if( this.playerMove < this.players ){
        this.playerMove++;
        if( this.count( this.playerMove )[0] >= 21 ){
          this.nextplayer();
        }
      }else{
        this.playerMove = 0;
        this.dealerRun();
      }
    }
  }

  dealerRun() {
    var that = this;
    if( this.count( 0 )[0] <= 16 ){
      setTimeout(function () {
        that.hit( 0 );
        that.dealerRun();
      }, 500);
    }else{
      this.end();
    }
  }

  end(){
    var that = this;
    for (var p = 1; p <= that.players; p++) {
      var playerCardCount = that.count( p )[0];
      var dealerCardCount = that.count( 0 )[0];
      var playerCards = $('.player' + p + ' .counter' ).attr('data-cards').split(', ').length;
      var dealerCards = $('.player' + 0 + ' .counter' ).attr('data-cards').split(', ').length;

      if( playerCardCount === 21 && playerCards === 2 && dealerCardCount === 21 && dealerCards === 2 ){
        console.log( "player" + p + " tied" );
      }else if( playerCardCount === 21 && playerCards === 2 && ( dealerCardCount !== 21 || dealerCards !== 2) ){
        console.log( "player" + p + " BLACKJACK" );
      }else{
        if( playerCardCount <= 21 && dealerCardCount <= 21 && playerCardCount > dealerCardCount ) {
          console.log( "player" + p + " wins" );
        }else if( playerCardCount <= 21 && dealerCardCount <= 21 && playerCardCount < dealerCardCount  ) {
          console.log( "player" + p + " loses" );
        }else if( playerCardCount <= 21 && dealerCardCount <= 21 && playerCardCount == dealerCardCount  ) {
          console.log( "player" + p + " tied" );
        }else if( playerCardCount > 21 ) {
          console.log( "player" + p + " loses" );
        }else if( dealerCardCount > 21 ) {
          console.log( "player" + p + " wins" );
        }
      }
    }
  }

}

var blackJack = new Game( 1 );

blackJack.start();

$('.stand-btn').click( () => {  blackJack.stand( 1 ) } );
$('.hit-btn').click( () => {    blackJack.hit( 1 ) } );
$('.split-btn').click( () => {  blackJack.split( 1 ) } );
$('.double-btn').click( () => { blackJack.double( 1 ) } );
$('.start').click( () => { blackJack.start() } );
