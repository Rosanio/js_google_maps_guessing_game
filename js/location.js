exports.Location = function(name, lat, lng) {
  this.name = name;
  this.lat = lat;
  this.lng = lng;
};

exports.getLocation = function() {
  var newLocation;
  $.getJSON('./../cities.json', function(data) {
    var index = Math.floor(Math.random() * 15);
     newLocation = new Location(data[index].cityName, data[index].lat, data[index].lng);
  });
  return newLocation;
};
