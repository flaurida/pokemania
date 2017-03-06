# Pokemania

Pokemania is a multiplayer Javascript game built with a Node.js server and Socket.IO to provide real time updates.

The objective of the game is simple: get as large as you can and don't lose. Your player becomes larger and evolves by defeating other Pokemon. You can defeat another Pokemon if they are smaller than you, or if you activate Dire Hit and run into a larger Pokemon. However, there is a delay for Dire Hit to take effect that gets longer as you grow and evolve. Controls are arrow keys to move and space bar to activate Dire Hit.

In order to keep the game engaging, computer players are used to fill the board in the event that not many players are online. In a similar vein, inactive players are removed after 30 seconds.           
