class card {
  constructor(suite, value) {
    suite = suite.toLowerCase()
    this.suite = suite
    this.value = value
  }

  display() {
    switch (this.value) {
      case 1:
        var number = "A";
      break;
      case 11:
        var number = "J";
      break;
      case 12:
        var number = "Q";
      break;
      case 13:
        var number = "K";
      break;
      default:
        var number = this.value;
      break;
    }

    return "<card data-value='"+this.value+"' class='card-suite-"+this.suite+" card-value-"+this.value+"'>" +
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

$('result').html( new card('club', 12 ).display() );
