const path=require('path');
const express=require('express')
var app=express()
const hbs=require('hbs')
const fs=require('fs');
const geocode=require('./utils/utils')
const forecast=require('./utils/forecast')
const partialPath=path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialPath);
const directory_name=path.join(__dirname,'../public');
app.use(express.static(directory_name));
const viewsPath=path.join(__dirname,'../templates/views');
app.set('views',viewsPath);
app.set('view engine','hbs');
var port = process.env.PORT || 3000;
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About',
        name:'context'
    })
})
app.get('',(req,res)=>
{
    res.render('index',
    {
        title:'Weather',
        name:'harsimran singh'
    })
});
app.get('/help',(req,res)=>
{
    res.render('help',{
        helptext:'helper using text',
        title:'help page',
        name:'Harsimran singh'
    })
})
app.get('/weather',(req,res)=>

{ 
    if(!req.query.address)
    {
        return res.send(
            {
                error:'provide address'
            }
        )
    }
    
    geocode(req.query.address,(error,{latitude,longitude,place_name}={})=>
    {
        if(error)
        {
           return res.send({error:error});
        }
            
            forecast(latitude,longitude,(error,response)=>
            {
            if(error)
            {
                return res.send({error:error});
            }
            res.send(
                {
                    forecast:'The weather is'+response.summary+'. The temperature is '+response.temperature+'. Humidity is '+response.humidity + 'and visibility is '+response.visibility,
                    placeName:place_name
                    

                }
            )
            })
    
    
})
})
app.get('/help/*',(req,res)=>
{
    res.render('404',
    {
        title:'Help Page not Found'
    })
})
app.get('*',(req,res)=>
{
    res.render('404',
    {
        title:'Page not found'
    })
})

app.listen(port,()=>
{
    console.log('Server is listening at port 3000');
})