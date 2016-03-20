exports.Map = function(location) {
  this.location = location;
  this.styleArray = [
    {
      featureType: "all",
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: "all",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "water",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "administrative.locality",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "administrative.neighborhood",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "transit",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "landscape",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "administrative.province",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "administrative.neighborhood",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  this.maxDistance = 4000;
  this.minZoom = 12;
  this.currentLatitude = this.location.lat;
  this.currentLongitude = this.location.lng;
  this.zoom = 14;
}

exports.Map.prototype.initialize = function() {
  var latitude = this.currentLatitude;
  var longitude = this.currentLongitude;
  var currentZoom = this.zoom;
  var styleArray = this.styleArray;
  var mapProp = {
    center:new google.maps.LatLng(latitude,longitude),
    zoom: currentZoom,
    mapTypeControl: false,
    styles: styleArray,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  this.map = map;
}

exports.Map.prototype.limitZoom = function() {
  var myMap = this.map;
  var minZoom = this.minZoom;
  google.maps.event.addListener(myMap, 'zoom_changed', function() {
    this.zoom = myMap.getZoom();
    if (myMap.getZoom() < minZoom) {
      myMap.setZoom(minZoom);
    }
  });
}

exports.Map.prototype.createCircle = function() {
  var marker = new google.maps.Marker({
    map: this.map,
    position: new google.maps.LatLng(this.location.lat, this.location.lng),
    // title: 'city.cityName'
  });

  marker.setVisible(false);
  var circle = new google.maps.Circle({
    map: this.map,
    radius: 4000,    // measured in metres
    strokeColor: '#00D407',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 5
  });
  circle.bindTo('center', marker, 'position');

  var circle2 = new google.maps.Circle({
    map: this.map,
    radius: 5500,    // measured in metres
    strokeColor: '#F5F100',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 5
  });
  circle2.bindTo('center', marker, 'position');

  var circle3 = new google.maps.Circle({
    map: this.map,
    radius: 7000,    // measured in metres
    strokeColor: '#E00000',
    fillOpacity: 0,
    strokeOpacity: 0.6,
    strokeWeight: 5
  });
  circle3.bindTo('center', marker, 'position');
}
