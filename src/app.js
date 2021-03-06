const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')//set up handle bars in order to use dynamic template
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'weather',
        name:'Jen'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'Weather',
        name:'Jen'
    })
})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error, forcastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name:'Jen',
        errorMessage: 'Page not found.'
    })
})

// for local host
// app.listen(3000, ()=>{
//     console.log('Server is up on port 3000.')
// })

//the first one is for heroku, if it fails use 3000 on local host
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})