const request = require("request")

const forecast = (lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/d6fef076ee5a99ed400f73b932661249/'+lat+','+long
    //console.log(url)
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast