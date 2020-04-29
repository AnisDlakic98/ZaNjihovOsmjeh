function initMap() {
    // 42.45401 19.23805
    // Initialize lat and long

    var myLatLng = { lat: 42.45401, lng: 19.23805 };
    // Customize map
    var grayStyles = [{
            featureType: "administrative",
            elementType: "all",
            stylers: [{ saturation: -99 }],
        },
        {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ saturation: -99 }],
        },
        {
            featureType: "poi",
            elementType: "all",
            stylers: [{ saturation: -99 }],
        },
        {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -99 }],
        },
        {
            featureType: "transit",
            elementType: "all",
            stylers: [{ saturation: -99 }],
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [{ saturation: -99 }],
        },
    ];
    // Create map
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: myLatLng,
        styles: grayStyles,
    });
    // Add map marker
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        icon: "https://i.ibb.co/4YgsDjw/map-marker-2-64.png",
        position: myLatLng,
        map: map,
        title: "Anis",
    });
}