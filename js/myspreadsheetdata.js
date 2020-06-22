var RapidResponse;
var SocialMedia;
var StreamingTalks;
var VirtualTour;
var VirtualExhibition;
var Gamification;
var eLearning;
var OtherActivities;

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyDgM8g4c4S-XoSfM-o58h1shACs0va6oQQ',
        'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
        'discoveryDocs':[ 'https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function listMuseums() {
        gapi.client.sheets.spreadsheets.values. get ({
            spreadsheetId: '1q3yI16JCcM3C7OmAPEdNxGp-E633f7w0W4o-6BLL-y4',
            range: 'List',
            valueRenderOption: 'UNFORMATTED_VALUE',
        }).then(function (response) {
            
            var range = response.result.values;
            var headings = range[0];
            var values = range.slice(1);
            
            const mydata = values.map(({
                0: ID, 1: Museum, 2: Address, 3: City, 4: GeonameID,
                5: lat, 6: lng, 7: Country, 8: Activity, 9: Link,
                10: Short_Description, 11: Date, 12: Read_more, 13: Hashtag
            }) =>
            ({
                ID, Museum, Address, City, GeonameID,
                lat, lng, Country, Activity, Link,
                Short_Description, Date, Read_more, Hashtag
            }));
            
            var geo = GeoJSON.parse(mydata, {
                Point:[ 'lat', 'lng']
            });
            
            //function setting the popups for all cases
            function onEachFeature (feature, featureLayer) {     
                    if (feature.properties && feature.properties.Museum && feature.properties.Activity && feature.properties.Link) {
                          featureLayer.bindPopup('<h7>' + feature.properties.Museum + '</h7><br>' + '<b>' + '<h8>' + feature.properties.Activity + '</h8>'+ '</b><br>' 
                        + '<p class="maptext">' + feature.properties.Short_Description + '</p>' + '<p class="maplink">' + '<a href="'+feature.properties.Link+'" target="_blank">' + feature.properties.Link + '</a>'+'</p>');                                 
                    }
                      //if no properties, popup saying record is being updated   
                    var popupContent = "<p>ops, I'm being updated</p>";  
                };
            
          //Rapid response category
            var RapidResponse = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: RapidResponseIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Rapid response collection");
                }  
            }).addTo(mapmuse);
            myLayersControl.addOverlay(RapidResponse, "Contemporary Collecting Projects");

//social media category  
           var SocialMedia = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: SocialMediaIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Social Media");
                }  
            }).addTo(mapmuse);
            myLayersControl.addOverlay(SocialMedia, "Social Media Initiatives");

//streaming talks category  
           var StreamingTalks = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: StreamingTalksIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Streaming talks");
                }  
            }).addTo(mapmuse);         
            myLayersControl.addOverlay(StreamingTalks, "Streaming Content");

//virtual tours category  
           var VirtualTour = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: VirtualTourIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Virtual tour");
                }  
            }).addTo(mapmuse);          
            myLayersControl.addOverlay(VirtualTour,  "Virtual Tours");

//virtual exhibition category  
           var VirtualExhibition = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: VirtualExhibitionIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Virtual exhibition");
                }  
            }).addTo(mapmuse);   
            myLayersControl.addOverlay(VirtualExhibition, "Online Exhibitions");

//gamification category  
           var Gamification = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: GamificationIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Gamification");
                }  
            }).addTo(mapmuse);              
            myLayersControl.addOverlay(Gamification, "Games");

//eLearning category  
           var eLearning = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: eLearningIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "eLearning");
                }  
            }).addTo(mapmuse);    
            myLayersControl.addOverlay(eLearning, "Educational Content");

//other category  
           var OtherActivities = L.geoJSON(geo, {
                    onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: OtherIcon});
                }, 
             //filter function
                filter: function (feature, featureLayer) {
            return (feature.properties.Activity === "Other type of activity");
                }  
            }).addTo(mapmuse);   
            myLayersControl.addOverlay(OtherActivities, "Other Activities");



            //do not touch
        });
    });
};

// Loads the JavaScript client library and invokes `initClient` afterwards.
gapi.load('client', initClient);