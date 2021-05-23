const request = require("request")
const Forecast = (latitude,longitude,Callback) => {
const url = "http://api.weatherstack.com/current?access_key=068356a1ba26043c11a86059836c8c95&query= "+latitude+", "+longitude+""
    request({url :url},(error,response) =>{
        if (error) {
            Callback("Unable to connect to weather server",undefined)
        }else if (response.body.error) {
            Callback("Unable to find location",undefined)
        } else {
            ct = JSON.parse(response.body).current
            Callback(undefined,ct)
        }
    })
}
module.exports = Forecast