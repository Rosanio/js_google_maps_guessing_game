exports.Game = function(map) {
  this.map = map
  this.points = 1000;
  this.totalScore = 0;
  this.playedCities = [];
  this.decrimentTimer = 1000;
  this.scoreTimer;
  this.minPlayerZoom = 14;
}

exports.Game.prototype.gameLoop = function() {
  this.decrimentTimer -= 20;
  this.map.currentLatitude = this.map.map.getCenter().lat();
  this.map.currentLongitude = this.map.map.getCenter().lng();
  var distance = this.calculateDistance();
  var diffDistance = distance - this.map.maxDistance;
  var decTime = 1000/(Math.pow(10, (diffDistance/2500)));
  if(this.decrimentTimer === 0) {
    this.decrimentTimer = 1000;

  }
  // console.log(distance);

  if(distance > this.map.maxDistance) {
    if(this.decrimentTimer === 20) {
      clearInterval(this.scoreTimer);
      this.scoreTimer = setInterval(function() {
        this.points--;
      }, decTime);
    }
  } else {
    clearInterval(this.scoreTimer);
  }
  var newZoom = this.map.map.getZoom();
  if (newZoom < this.minPlayerZoom) {
    this.minPlayerZoom = newZoom;
    this.points -= 50*(14-newZoom);
  }
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

exports.Game.prototype.calculateDistance = function() {
  var R = 6371000; //Earth radius in meters
  var theta1 = Math.radians(this.map.location.lat);
  var theta2 = Math.radians(this.map.currentLatitude);
  var deltaTheta = Math.radians(Math.abs(this.map.currentLatitude-this.map.location.lat));
  var deltaLambda = Math.radians(Math.abs(this.map.currentLongitude-this.map.location.lng));
  var a = Math.sin(deltaTheta/2)*Math.sin(deltaTheta/2) +
          Math.cos(theta1)*Math.cos(theta2) *
          Math.sin(deltaLambda/2)*Math.sin(deltaLambda/2);
  var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

exports.Game.prototype.showLabels = function(pointValue, index) {
  var zoom = this.map.map.getZoom();
  if(this.map.styleArray[index].stylers[0].visibility !== "on") {
    points -= pointValue;
    this.map.styleArray[index].stylers[0].visibility = "on";
  }

  // city = cityArray[index];
  google.maps.event.addDomListener(window, 'load', this.map.initialize());
  this.map.limitZoom();
  this.map.createCircle();
}
