<!DOCTYPE html>
<html lang="de" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Casino</title>
    <script defer src="js/jquery.js"></script>
    <script defer src="app.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <board>
      <div class="dealerarea player0">
        <div class="counter"> 0 </div>
        <div class="playercards"> </div>
      </div>

      <div class="playerarea player1">
        <div class="counter"> 0 </div>
        <div class="playercards"> </div>
        <div class="betoption">
          <div class="chips">
            <div class="chips-field"> ooooooo </div>
            <div class="chips-btns">
              <div class="add-chips-btn"> + </div>
              <div class="minus-chips-btn"> - </div>
            </div>
          </div>
          <div class="buttons">
            <div class="split-btn grayed-btn btn"> Split </div>
              <div class="stand-btn btn"> Stand </div>
              <div class="hit-btn btn" > Hit </div>
            <div class="double-btn btn"> Double </div>
          </div>
        </div>
      </div>

      <div class="start btn">
        START
      </div>

    </board>
  </body>
</html>
