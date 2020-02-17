var styledMapType = new google.maps.StyledMapType([
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ],
  {name: 'Styled Map'});

function InitMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: new google.maps.LatLng(28.644800, 77.216721),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]  // Turn off POI.
            },
            {
                featureType: 'transit.station',
                stylers: [{ visibility: 'off' }]  // Turn off bus, train stations etc.
        }],
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    var iconBase = "https://storage.cloud.google.com/noww_backet/assets/";
    var icons = {
        worker: {
            icon: iconBase + 'genie.png'
        }
    };

    firebase.initializeApp({
        apiKey: "AIzaSyBegvaryh20yEaOtXUK2hBsSpNUpWbXtgY",
        databaseURL: "https://mineral-anchor-249706.firebaseio.com"
    });
    // Generate a random Firebase location
    var firebaseRef = firebase.database().ref().child("worker_locations");
    var firebaseRefW = firebase.database().ref().child("worker_info");
    // Create a new GeoFire instance at the random Firebase location
    var geoFireInstance = new geofire.GeoFire(firebaseRef);
    // var geoWorkers = new firebase.database().ref("/worker_info/");
    var geoQuery = geoFireInstance.query({
        center: [50.4547,30.5238],
        radius: 3000
    });
    var matches = [];
    geoQuery.on("key_entered", function(key,location) {
            matches.push({
                "key":key,
                "loc":location
            });
            name = firebase.database().ref('/worker_info/' + key).once('value').then(function(snapshot) {
                var name =  (snapshot.val() && snapshot.val().name) || 'No Name';
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location[0], location[1]),
                    icon: icons["worker"].icon,
                    map: map
                    });
                    google.maps.event.addListener(marker, 'click', (function (marker, name) {
                    return function () {
                        infowindow.setContent(name);
                        infowindow.open(map, marker);
                    }
                    })(marker, name));
            });
    });
}

function InitMapOne(key) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: new google.maps.LatLng(28.644800, 77.216721),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]  // Turn off POI.
            },
            {
                featureType: 'transit.station',
                stylers: [{ visibility: 'off' }]  // Turn off bus, train stations etc.
        }],
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    var iconBase = "https://storage.cloud.google.com/noww_backet/assets/";
    var icons = {
        worker: {
            icon: iconBase + 'genie.png'
        }
    };

    firebase.initializeApp({
        apiKey: "AIzaSyBegvaryh20yEaOtXUK2hBsSpNUpWbXtgY",
        databaseURL: "https://mineral-anchor-249706.firebaseio.com"
    });
    // Generate a random Firebase location
    var firebaseRef = firebase.database().ref().child("worker_locations");
    var firebaseRefW = firebase.database().ref().child("worker_info");
    // Create a new GeoFire instance at the random Firebase location
    var geoFireInstance = new geofire.GeoFire(firebaseRef); 
    // // var geoWorkers = new firebase.database().ref("/worker_info/");
    // <!-- var geoQuery = geoFireInstance.query({
    //     center: [50.4547,30.5238],
    //     radius: 3000
    // }); -->
    // <!-- var matches = [];
    // geoQuery.on("key_entered", function(key,location) {
    //         matches.push({
    //             "key":key,
    //             "loc":location
    //         });
    geoFireInstance.get(key).then(function(location) {
        if (location === null) {
          console.log("Provided key is not in GeoFire");
        }
        else {
            info  = firebase.database().ref('/worker_info/' + key).once('value').then(function(snapshot) {
                var name =  (snapshot.val() && snapshot.val().name) || 'No Name';
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location[0], location[1]),
                    icon: icons["worker"].icon,
                    map: map
                    });
                    google.maps.event.addListener(marker, 'click', (function (marker, name) {
                    return function () {
                        infowindow.setContent(name);
                        infowindow.open(map, marker);
                    }
                    })(marker, name));
            });
        }
      }, function(error) {
        console.log("Error: " + error);
      });

  
}