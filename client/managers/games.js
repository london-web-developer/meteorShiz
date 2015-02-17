var gameData = [
  {
  	_id:'01',
    owner_username: 'Matt',
    status: 'played',
    game_created:'',
    game_started:'',
    game_finished:'',
    speaker:'',
    players:[
    	{_id:'01',username:'Matt',buzzwords:['2.0','HTML5','Big Data']},
    	{_id:'02',username:'John',buzzwords:['HTML5','Big Data','Apps']}
    ],
    winner:'Matt'
  },
  {
  	_id:'02',
    owner_username: 'John',
    status: 'played',
    game_created:'',
    game_started:'',
    game_finished:'',
    speaker:'AVDB',
    players:[
    	{_id:'01',username:'Matt',buzzwords:['2.0','HTML5','Big Data']},
    	{_id:'02',username:'John',buzzwords:['HTML5','Big Data','Apps']}
    ],
    winner:'Matt'
  }
  
];

Template.games.helpers({
  games: gameData,
  hasGames:function(){
  	return typeof gameData != 'undefined' && _.isArray(gameData);
  }
});