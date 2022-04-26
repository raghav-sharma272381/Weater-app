const request = require('postman-request')


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoicm95c2hhcm1hIiwiYSI6ImNsMmFkOW8zZzAxczYzZW1sYTkxMXk3NGEifQ.SLC0SDhC7ppFzgfodNNC7w&limit=1"

    request({url, json: true}, (error,response) => {
        if(error){
            console.log(error)
            callback("unable to connect to location services")
        }
        else if(response.body.features.length === 0){
            callback("unable to find that location")
        }
        else{

            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude:  response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
       
    })
}


module.exports = geocode