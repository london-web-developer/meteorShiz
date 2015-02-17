Meteor.publish('publicUsers', function() {
  return Meteor.users.find({}, {fields: {
    services: false
  }});
});