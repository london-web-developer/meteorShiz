/*Meteor.Router.add({
	'/': { as: '/', to: function() {
		if (Meteor.user() !== null) {
			Session.set('active', 'games');
			Session.set('activeSub', 'games');
			return 'games';
		} else {
			console.log('fd');
			return 'homepage';
		}
	}},
	'/games': {
		to: 'games', 
		and: function() { 
			Session.set('active', 'games');
			Session.set('activeSub', 'games');
		}
	},
	'/played-games': {
		to: 'playedGames', 
		and: function() { 
			Session.set('active', 'games');
			Session.set('activeSub', 'playedGames');
		}
	},
	'/new-game': {
		to: 'newGame', 
		and: function() { 
			Session.set('active', 'newGame');
		}
	}
});
Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user()) {
      return page;
    } else {
      return 'homepage';
    }
  }
});

Meteor.Router.filter('checkLoggedIn', {except: ['/', 'homepage'] });*/

Router.map(function(){
	
    this.route('home', {
  		path: '/',
  		template: 'homepage',
  		layoutTemplate: 'layout',
  		action: function() {
  			if (Meteor.user() !== null) {
			Session.set('active', 'newGame');
			Session.set('activeSub', 'newGame');
			this.render('newGame');
		} else {
			delete Session.keys['players'];
			delete Session.keys['gameName'];
			activePlayers = [];
			this.render('homepage');
		}
  		}
  		
	});
	
	this.route('newGame', {
  		path: '/new-game',
  		template: 'newGame',
  		layoutTemplate: 'layout'
  		
	});
	
});

