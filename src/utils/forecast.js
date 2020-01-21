const request=require('request');

const forecast= (latitude,longitude,callback) => 
{
        let url='https://api.darksky.net/forecast/a87a1ad6dbc7508f04e3e8674b964821/';
        url=url+latitude+','+longitude;
        request({url,json:true},(error,{body}) => {
        
    if(error)
    {callback('Internet is not connected',undefined)}

    else if(body.error)
    {
        callback('url is not correct',undefined);
        console.log(url);    
    }
    else{
    const data=body;
    callback(undefined,data.currently);    
    console.log(url);
}
    });
    }
module.exports=forecast;

