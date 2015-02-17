Template.mainNav.games = function () {
	return Session.equals("active", "games") ? "active" : "";
};
Template.mainNav.newGame = function () {
    return Session.equals("active", "newGame") ? "active" : '';
};