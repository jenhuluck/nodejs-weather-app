const request = require("request")
// const request = require('request')
// //add lanuage and unit option
// //const url = "https://api.darksky.net/forecast/d6fef076ee5a99ed400f73b932661249/42.0308,-93.6319?units=si&lang=zh"
// const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/Ames%20Iowa.json?access_token=pk.eyJ1IjoiaHVzaXRhbCIsImEiOiJjazRyazB5dzU0YXhoM2xxZTdwd3MweG1hIn0.M82pjlRI0NahM9koxCdOFA&limit=1"
// request({url: url, json: true},(error, response)=>{
//     //json:true automatically parse json, then response is already object
//     //const data = JSON.parse(response.body)
//     var lat = response.body.features[0].center[0]
//     var long = response.body.features[0].center[1]
//     //console.log(response.body.daily.data[0].summary+" "+precip+" "+temp)
//     console.log(lat+" "+long)
//})

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHVzaXRhbCIsImEiOiJjazRyazB5dzU0YXhoM2xxZTdwd3MweG1hIn0.M82pjlRI0NahM9koxCdOFA&limit=1'

    request({url: url, json: true},(error, response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode