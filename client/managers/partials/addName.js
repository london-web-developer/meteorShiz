Template.addName.rendered = function(){
$("#findUsers").select2({
			minimumInputLength: 2,
            query: function (query) {
            	var term = query.term,
            		regex = new RegExp(query.term, 'i'),
                	users = Meteor.users.find({"username": regex, $where: "!_.contains(activePlayers,this.username)"} ).fetch(),
                	data = {results: []};
                $.each(users, function(i, user){
                	data.results.push({id:user._id, text:user.username});
                });
                query.callback(data);
            }
		});
		$("#findUsers").on('change', function(){
    	if($(this).select2('data') === null) return null;
    	$('a.addToPlayers').remove();
    	var players = Session.get('players'),
    		val = _.findWhere(players,{id:$(this).select2('data').id});
    	if(typeof val !== 'object'){
    		var data = $(this).select2('data');
    		$('<\a>')
    		.attr('href', '#')
    		.attr('data-obj', JSON.stringify({username:data.text, id:data.id}))
    		.addClass('addToPlayers')
    		.addClass('buttons')
    		.text('Add')
    		.insertBefore('#findUsers');
    	}
    	val = null;
    });
}
Template.addName.helpers({
	players:function(){
		var players = Session.get('players');
		if(players){
			return players;
		}
		else {
			Session.set('players',[{id:Meteor.userId(), username:Meteor.user().username}]);
			activePlayers.push(Meteor.user().username);
			return players;
		}
	}
});