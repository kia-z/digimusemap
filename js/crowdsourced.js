var RapidResponseContr;
var SocialMediaContr;
var StreamingTalksContr;
var VirtualTourContr;
var VirtualExhibitionContr;
var GamificationContr;
var eLearningContr;
var OtherActivitiesContr;

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyDgM8g4c4S-XoSfM-o58h1shACs0va6oQQ', //'AIzaSyAitMCy698R_u2qiu6G20-Z7PEo7eHQ-Q4',
        'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
        'discoveryDocs':[ 'https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function listContr() {
        
        var ranges =[ 'English', 'Russian', 'Greek', 'Deutsch', 'Spanish', 'Italian', 'French'];
        gapi.client.sheets.spreadsheets.values.batchGet({
            spreadsheetId: '1s8K-AzcCy6tKVbLicOJ9gyjs6u-VSxBxFRZEfGW5t6c',
            ranges: ranges            
            }).then((response) => {
  var myresult = response.result.valueRanges;
 
  var French = myresult[6].values.slice(1);
  var Greek = myresult[2].values.slice(1);
  var Russian = myresult[1].values.slice(1);
  var Spanish = myresult[4].values.slice(1);
  var Deutsch = myresult[3].values.slice(1);
  var Italian = myresult[5].values.slice(1);
  var English = myresult[0].values.slice(1);
      
  var values = French.concat(Greek, Russian, Spanish, Deutsch, Italian, English); 
 
  const ContrData = values.map(({
                0: Timestamp, 1: Museum, 2: Original_Activity, 3: Activity, 4: Short_Description,
                5: Link, 6: Keywords, 7: Read_more, 8: Address, 9: lat, 10: lng, 11: Country
            }) =>
            ({
                Timestamp, Museum, Original_Activity, Activity, Short_Description, Link, Keywords, Read_more, Address, lat, lng, Country		
            }));
            
            var Contributions = GeoJSON.parse(ContrData, {
                Point:[ 'lat', 'lng']
            });
    
            //function setting the popups for all cases
            function onEachFeature (feature, featureLayer) {                 
                if (feature.properties && feature.properties.Museum && feature.properties.Activity) {
                      featureLayer.bindPopup('<h7>' + feature.properties.Museum + '</h7><br>' + '<b>' + '<h8>' + feature.properties.Activity + '</h8>' + '</b><br>' + '<p class="maptext">' + feature.properties.Short_Description + '</p>' + '<p class="maplink">' + '<a href="' + feature.properties.Link + '" target="_blank">' + feature.properties.Link + '</a>' + '</p>');                      
                }
                  //if no properties, popup saying record is being updated  
                var popupContent = "<p>ops, I'm being updated</p>";  
            };
            
            //Rapid response category
            var RapidResponseContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: RapidResponseIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Rapid response collection");
                }               
            }).addTo(mapmuse);
            myLayersControl.addOverlay(RapidResponseContr, "Contemporary Collecting Projects (crowdsourced)");
            
            //social media category
            var SocialMediaContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: SocialMediaIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Social Media");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(SocialMediaContr, "Social Media Initiatives  (crowdsourced)");
            
            //streaming talks category
            var StreamingTalksContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: StreamingTalksIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Streaming talks");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(StreamingTalksContr, "Streaming Content  (crowdsourced)");
            
            //virtual tours category
            var VirtualTourContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: VirtualTourIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Virtual tour");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(VirtualTourContr, "Virtual Tours  (crowdsourced)");
            
            //virtual exhibition category
            var VirtualExhibitionContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: VirtualExhibitionIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Virtual exhibition");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(VirtualExhibitionContr, "Online Exhibitions  (crowdsourced)");
            
            //gamification category
            var GamificationContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: GamificationIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Gamification");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(GamificationContr, "Games  (crowdsourced)");
            
            //eLearning category
            var eLearningContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: eLearningIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "eLearning");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(eLearningContr, "Educational Content  (crowdsourced)");
            
            //other category
            var OtherActivitiesContr = L.geoJSON(Contributions, {
                onEachFeature: onEachFeature,
                //function setting markers
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: OtherIcon
                    });
                },
                //filter function
                filter: function (feature, featureLayer) {
                    return (feature.properties.Activity === "Other type of activity");
                }
                 
            }).addTo(mapmuse);
            myLayersControl.addOverlay(OtherActivitiesContr, "Other Activities  (crowdsourced)");
            
            
            
            //do not touch
        });
    });
};

// Loads the JavaScript client library and invokes `initClient` afterwards.
gapi.load('client', initClient);