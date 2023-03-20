//get html elements using jquery
const $searchButton = $("#search-submit");
const $resultVault = $("#results");
let $playerName = $(".name");
let $playerIMG = $(".img");
let $playerTeam = $('.Team');
let $playerHeight = $(".height");
let $playerWeight = $(".weight");
let $playerPosition = $(".position");
let $playerDescription = $(".description");
let $resultCard = $('.result-card');



//assign a variable to a users input
let userInput = $("#search-input");
//console.log(userInput.val());

//addEventListener to search button
$searchButton.click(function (e) {
  e.preventDefault();
  
  //call getAPI function with userInput.val() as the argument
  getAPI(userInput.val());
  $resultCard.addClass('active');
});
function getAPI(playerName) {
  //get data from external link using jquery $.get
  $.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`,(data) => {
      console.log('data from api',data );

      let nbaPlayersFound = false;

        //create for loop
      for (let i = 0; i < data.player.length; i++) {
        let searchResults = data.player[i];

        // Only show NBA players
        if (searchResults.strSport === "Basketball") {
          nbaPlayersFound = true;
          
          //get player name from data
          $playerName.text(searchResults.strPlayer);
          
          //place image from search result
          let newIMG = searchResults.strCutout;
          $playerIMG.attr('src',newIMG);
          
          //get player team from data
          $playerTeam.text(searchResults.strTeam);

          //get player height and weight from data
          $playerHeight.text(searchResults.strHeight +" "+ searchResults.strWeight);
          
          //get player position from data
          $playerPosition.text(searchResults.strPosition)

          //get player description from data
          $playerDescription.text(searchResults.strDescriptionEN)
        }
      }

      // Display message if no NBA players found
      if (!nbaPlayersFound) {
        $resultVault.html("<p>No NBA players found.</p>");
      }
    }
  );
}

