# Paldea Pokemon Team Builder

## Brief Rundown:

This is my take on a pokemon team builder web application. This team builder focuses on the newest pokemon games within the Paldea region.

An issue that I have found with many other team builders is that they commonly have the pokemon data spread out across the web page. I find the user experience is hindered with this approach.

My app displays all of the information on one, unscrollable web page. The data the user will need is right in front of them at any given moment. The only scrollable element is the pokedex which contains all four hundred pokemon in the regional Paldea pokedex (and the type chart if needed).

The app uses Firebase for storing data in the backend.

## How to Use:

The app is pretty simple. The user can scroll/search for a pokemon in the pokedex component. Click on the desired pokemon. The pokemon party and type chart components will be filled with the respective pokemon's in-game information.

If the user would like to delete pokemon, they may click the "Delete Pokemon" button below the pokemon's name in their party. Or, if they want to delete their entire party, they can click the "Delete Entire Party" button at the top of the app.

If the user would like to save their parties, then they will have to create an account. A user can only have up to three parties per account. To save pokemon to a party, the user must click on the party button they would like to save the party to. Then simply click the "Save/Update Team" button to save or update their team. To access a saved team, simply click the party button they would like to see. 

## Future QOL Updates: 

If a user searches one of the pokemon with a hyphen in it's name, the pokemon card returns a space instead of a hyphen. This is a logic error and I will fix it when I have the time to debug it.

The app isn't as nice looking as I'd like it to be. For example, the type chart currently uses simple strings to display information. I'd like to replace those with pictures of the types to make the apps appearance better.
