const path = require("path")
const express = require("express")
const request = require("request")
const hbs = require("hbs")
const GeoCode = require("./utils/GeoCode")
const Forecast = require("./utils/Forecast")

// Directory paths for Express config
const PublicDirectoryPath = path.join(__dirname,'public')
const ViewsDirectoryPath = path.join(__dirname,'templates/views')

app = express()

const Port = process.env.PORT || 3000
// Setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",ViewsDirectoryPath)

// Setup static directory to serve
app.use(express.static(PublicDirectoryPath))


app.get("",(req,res) => {
    res.render('index',"")
})


app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    GeoCode(req.query.address,(error,GeoCodeResponse) => {
        if (error) {
            return res.send({error })
        }
        Forecast(GeoCodeResponse.latitude,GeoCodeResponse.longitude,(error,ForecastResponse) => {
            if (error) {
                return res.send({ rrror })
            }
            res.send(ForecastResponse)
        })
    })
})

app.get('*', (req,res)  => {
    res.render('404',
        {
            404:"404!",
            msg:"Page not found!"
        }
    )
})

app.listen(Port,(error,data) => {
    console.log("Server Started.")
})