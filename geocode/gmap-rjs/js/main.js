define("async",[],function(){function n(e){var t,n;t=document.createElement("script"),t.type="text/javascript",t.async=!0,t.src=e,n=document.getElementsByTagName("script")[0],n.parentNode.insertBefore(t,n)}function r(t,n){var r=/!(.+)/,i=t.replace(r,""),s=r.test(t)?t.replace(/.+!/,""):e;return i+=i.indexOf("?")<0?"?":"&",i+s+"="+n}function i(){return t+=1,"__async_req_"+t+"__"}var e="callback",t=0;return{load:function(e,t,s,o){if(o.isBuild)s(null);else{var u=i();window[u]=s,n(r(t.toUrl(e),u))}}}}),define("modules/gmap",["async!//maps.googleapis.com/maps/api/js"],function(e){var t={map:{},init:function(t,n,r){var i=new google.maps.Geocoder,s=new google.maps.Marker({position:new google.maps.LatLng(t,n),anchorPoint:new google.maps.Point(0,-29),draggable:!0});map=new google.maps.Map(document.getElementById("map-canvas"),{zoom:10}),map.setCenter(s.position),s.setMap(map),google.maps.event.addListener(s,"dragend",function(e){var t={lat:e.latLng.lat(),lng:e.latLng.lng()},n={street_number:"short_name",route:"long_name",establishment:"long_name",locality:"long_name",administrative_area_level_1:"short_name",country:"short_name",postal_code:"short_name"};result={address:{},latitude:0,longitude:0},i.geocode({location:t},function(e,i){if(i===google.maps.GeocoderStatus.OK)if(e[0]){var s,o=null;for(s=0;s<e[0].address_components.length;s++)o=e[0].address_components[s].types[0],n[o]&&(result.address[o]=e[0].address_components[s][n[o]]);result.latitude=t.lat,result.longitude=t.lng,typeof r=="function"&&r(result)}else window.alert("No results found");else window.alert("Geocoder failed due to: "+i)})})}};return t}),define("modules/location",["jquery","modules/gmap"],function(e,t){var n={latitude:39.084014922903,longitude:-77.51372591791,init:function(){t.init(n.latitude,n.longitude,function(t){console.log("RESULT",t),t.address&&n._setAddress(t.address),e("#latitude").val(t.latitude),e("#longitude").val(t.longitude)})},_setAddress:function(t){var n=[];t.street_number&&n.push(t.street_number),t.route&&n.push(t.route),n.length>0&&e("#street").val(n.join(" ")),t.locality&&e("#locality").val(t.locality),t.administrative_area_level_1&&e("#region").val(t.administrative_area_level_1),t.country&&e("#country").val(t.country)}};return n.init(),n}),define("jquery",[],function(){return jQuery}),require.config({paths:{async:"require/async"}}),require(["modules/location"],function(e){e.init()}),define("main",function(){});