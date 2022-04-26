const request = require('postman-request')

const weather = (longitude,latitude,callback) => {
    const url =  'http://api.weatherstack.com/current?access_key=51366ca40f49022d81d2efc9e856c3d2&query='+ longitude + ',' + latitude + '&units=m'
    request({url, json:true}, (error, response) => {
        if(error){
            callback("Unable to connect to Wether services",undefined)
        }
        else if(response.body.error){
            callback('unable to find wether for that location',undefined)
        }
        else{

            callback(undefined, {
                weather_descriptions : response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                region: response.body.location.name

            })
        }
    })
}
module.exports = weather