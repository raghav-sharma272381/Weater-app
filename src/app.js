const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/Weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roy Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roy Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Roy Sharma'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to enter an address'
        })
    }
    geocode(req.query.address, (error , {latitude, longitude,location } = {} ) => {
        if(error){
            return res.send({error})
        }
     
        weather(longitude,latitude, (error, {weather_descriptions,temperature,feelslike,region} ) => {
            if(error){
                return res.send({error})
            }
            const forecast = 'It is a ' + weather_descriptions + ' day in ' + region + '. The temprature is ' + temperature + ' degrees, and it feels like ' + feelslike + ' degrees.'
            
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            })
        } )
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roy Sharma',
        errorMessage: 'Help article not found.'
    })
}),

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roy Sharma',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port')
})