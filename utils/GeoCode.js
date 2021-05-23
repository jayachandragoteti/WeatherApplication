const request = require("request")
const GeoCode = (address,Callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiamF5Z290ZXRpIiwiYSI6ImNrb21zOTljdjF4MWIydnBuY3Mxc3NobGwifQ.Ps4KnhqFWdzUwlwmuvtylw&limit=1"
    request({url : url },(error,response) => {
        const body = JSON.parse(response.body)
        if (error) {
            Callback("Unable to connect to location server!",undefined)
        }else if(body.features.length === 0){
            Callback("Unable to find location,try to search another location!",undefined)
        }else{
            Callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = GeoCode