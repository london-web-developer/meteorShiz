Template.subNav.games = function () {
    return Session.equals("activeSub", "games") ? "active" : '';
};
Template.subNav.playedGames = function () {
    return Session.equals("activeSub", "playedGames") ? "active" : '';
};