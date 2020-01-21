const input=document.querySelector("input"); 
const form=document.querySelector("form");
const loc=input.placeholder;
const msg1=document.querySelector("#message-1");
const msg2=document.querySelector("#message-2");
document.addEventListener("submit",(e)=>
{
    e.preventDefault();
    msg1.textContent="Loading....";
    fetch('http://localhost:3000/weather?address='+input.value).then((response)=>
    {
        response.json().then((data)=>
        {
            if(data.error)
            {
               msg1.textContent=data.error;
            }
            else{
                msg1.innerHTML="placeName:"+data.placeName;
                msg2.innerHTML="\n"+"forecast:"+data.forecast;
            console.log(data.placeName);
                console.log(data.forecast);

        }
        })
    })
})