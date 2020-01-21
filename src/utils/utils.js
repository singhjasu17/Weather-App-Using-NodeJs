const request=require('request');
const geocode = (address,callback) =>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFyc2ltcmFuc2FpbmkiLCJhIjoiY2sycTlvajVtMGJ0MzNjbG55d3NuMHBtaCJ9.y-pVUvAElI4FA3wxmDWyHQ&limit=1';
    request({url,json:true},(error,{body}) => 
{
    if(error)
    {
        callback('Internet is not connected',undefined);
        
    }
    else if(body.message)
    {
        callback('invalid url',undefined);
        
    }
    else if(body.features.length ==0)
    {
        callback('place doesn\'t exist',{latitude:0,longitude:0,place_name:'sdf'});
    }
    else{
    var coord=body.features[0].center;
    
    callback('',{
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        place_name:body.features[0].place_name
    });
    }
})
}
module.exports=geocode;