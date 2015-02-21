Meteor.subscribe('publicUsers');
activePlayers = [];


Template.newGame.helpers({
	
	canGetWords:function(){
		return Session.get('players').length > 1;
	},
	amount:function(){
		return Session.get('amount');
	},
	haveAddedName:function(){
		var length = Session.get('gameName').length;
		return length > 1;
	}
});

Template.newGame.events({
	'click .addToPlayers':function(e){
		e.preventDefault();
		var players = Session.get('players');
		players.push(JSON.parse(e.target.attributes['data-obj'].value));
		Session.set('players', players);
		$('#findUsers').select2("data",null);
		$('a.addToPlayers').remove();
		activePlayers.push(JSON.parse(e.target.attributes['data-obj'].value).username);
	},
	'click .delete':function(e){
		e.preventDefault();
		var players = Session.get('players');
		players.splice($(e.target.parentNode).index(),1);
		activePlayers.splice($(e.target.parentNode).index(),1);
		Session.set('players', players);
	},
	'click #addWords':function(e){
		e.preventDefault();
		var amount = 3,
			players = Session.get('players').length -1;
		amount = amount + players;
		var num = [];
		while(amount!= 0){
			num.push(amount);
			amount--;
		}
		Session.set('amount', num.reverse());
		$('#players').hide();
		$('#words').show();
	},
	'click #backTP':function(e){
		e.preventDefault();
		$('#words ol li').remove();
		if($('#buzzers').length) $('#buzzers').remove();
		$('#players').show();
		$('#words').hide();
	},
	'click #generate':function(e){
		e.preventDefault();
		$.ajax({
			url:'http://randomword.setgetgo.com/get.php',
			dataType:'jsonp',
			jsonp: 'callback',
			type:'GET',
			success:function(data){
				var word = data.Word;
				word = word.charAt(0).toUpperCase() + word.slice(1);
				$('#gameName').val(word);
				Session.set('gameName', word);
			},
			error:function(data){
				$('#gameName').val('Gen error: pls create');
			}
			
		});
	},
	'keyup #words input':function(e){
		var flag = true;
		$.each($('#words input'),function(i, input){
			if($(input).val() == '') flag = false;
		});
		if(flag === true && $('#buzzers').length === 0) {
			$('<p id="buzzers">If you are happy with all your buzzwords <a href="#" class="buttons">Save your game</a></p>').appendTo('#words');
		}
		else if(flag === false && $('#buzzers').length !== 0){
			$('#buzzers').remove();
		}
	},
	'keyup input#gameName':function(e){
		Session.set('gameName', e.target.value);
	},
	'blur input#speaker':function(e){
		Session.set('speaker', e.target.value);
	},
	'click #buzzers a':function(e){
		e.preventDefault();
		
		var players = Session.get('players'),
			words = [],
			word,
			count;
			
		$.each($('#words input'),function(i, input){
			words.push($(input).val());
		});
		
		$.each(players, function(i, player){
			player.buzzwords = [];
			player.temp = [];
		});
		
		count = 3;
		
		var reA = /[^a-zA-Z]/g;
		var reN = /[^0-9]/g;
		function sortAlphaNum(a,b) {
			var aA = a.replace(reA, "");
			var bA = b.replace(reA, "");
			if(aA === bA) {
				var aN = parseInt(a.replace(reN, ""), 10);
				var bN = parseInt(b.replace(reN, ""), 10);
				return aN === bN ? 0 : aN > bN ? 1 : -1;
			} else {
				return aA > bA ? 1 : -1;
			}
		}
		
		function checkArrays(playerId, arr){
			var flag = true;
			for(var i = 0; i < players.length; i++){
				if(playerId !== players[i].id){
					if(_.isEqual(players[i].buzzwords.sort(sortAlphaNum),arr.sort(sortAlphaNum))) flag = false;
				}
			}
			return flag;
		}
		
		function getWord(buzzwords){
			var word = words[Math.floor((Math.random()*words.length))];
			if(_.contains(buzzwords,word)){
				return getWord(buzzwords);
			}
			return word;
		}
		
		function createArray(player){
			player.temp = player.buzzwords;
			player.temp.push(getWord(player.buzzwords));
			if(checkArrays(player.id, player.temp)){
				player.buzzwords = player.temp;
				delete player.temp;
			}
			else{
				player.temp = [];
				player.buzzwords.pop(player.buzzwords.length);
				createArray(player);
			}
		}
		
		while(count > 0){
			for(var i = 0; i < players.length; i++){
				createArray(players[i]);
			}
			count--;
		}
		
		console.log(players);
		
	}
});
    /*{
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
  }*/