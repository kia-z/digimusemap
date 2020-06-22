// twitter data from the hashtag closedbutactive
var ClosedbutActive;

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyDgM8g4c4S-XoSfM-o58h1shACs0va6oQQ',
        'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
        'discoveryDocs':[ 'https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function ClbAc() {
        gapi.client.sheets.spreadsheets.values. get ({
            spreadsheetId: '1NTL9tAZjoO-WRJ1GJyiYbtpv19A8J-edbhEU4gmAC94',
            range: 'ToMap',
            valueRenderOption: 'UNFORMATTED_VALUE',
        }).then(function (response) {
            
            var rangeClbAc = response.result.values;
            var headingsClbAc = rangeClbAc[0];
            var valuesClbAc = rangeClbAc.slice(1);
            
            const mydataClbAc = valuesClbAc.map(({
                0: id_str, 1: from_user, 2: text, 3: created_at, 4: time, 5: geo_coordinates, 6: user_lang, 7: in_reply_to_user_id_str,
                8: in_reply_to_screen_name, 9: from_user_id_str, 10: in_reply_to_status_id_str, 11: source, 12: profile_image_url,
                13: user_followers_count, 14: user_friends_count, 15: user_location, 16: lat, 17: lng, 18: status_url, 19: entities_str
            }) =>
            ({
                id_str, from_user, text, created_at, time, geo_coordinates, user_lang, in_reply_to_user_id_str,
                in_reply_to_screen_name, from_user_id_str, in_reply_to_status_id_str, source, profile_image_url,
                user_followers_count, user_friends_count, user_location, lat, lng, status_url, entities_str
            }));
            
            var geoClbAc = GeoJSON.parse(mydataClbAc, {
                Point:[ 'lat', 'lng']
            })
            
            var ClosedbutActive = L.geoJson(geoClbAc, {
                onEachFeature: function (feature, featureLayer) {
                    featureLayer.bindPopup('<blockquote class="twitter-tweet">' + '<p dir="ltr">' + feature.properties.text + '</p>' + '&mdash; Tweet by' + feature.properties.from_user + '<br>' + '<a href="' + feature.properties.status_url + '">' + feature.properties.created_at + '</a></blockquote>');
                return feature.properties.id_str;
                },
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: myIconClbAc
                    });
                }
            }).addTo(mapmuse);
            myLayersControl.addOverlay(ClosedbutActive, "&#35;ClosedbutActive");
        });
    });
};



// Loads the JavaScript client library and invokes `initClient` afterwards.
gapi.load('client', initClient);