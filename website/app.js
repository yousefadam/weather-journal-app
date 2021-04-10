/* Global Variables */



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const apiKey = "6250279eaef881e4af5e24c7107b963a";
//const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`


//eventlistener
const btn = document.querySelector('#generate');
btn.addEventListener("click", action);


function action(e){
    const temprature = getWeather();
    console.log("temp", temprature);
    const feeling  = document.querySelector('#feelings').value;
    getWeather()
    .then(function(data){
        console.log(data)
        const newEntry = {
            temp:data,
            feeling:feeling,
            date:newDate
        }
        postData("/addWeather", newEntry)
        console.log(newEntry)
        return data
    }

    ).then(
       //update UI

    function updateUI(data){
    document.querySelector("#date").innerText = newDate;
    document.querySelector("#temp").innerText = data;
    document.querySelector("#content").innerText = feeling;
    }
    )
}





async function getWeather(){
    
    try{
        const zipCode = document.querySelector('#zip').value;
        if(!zipCode){
         alert("Enter a Zipcode");
         return
        }
        const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const res = await fetch(fullURL);
        const data = await res.json();

        console.log(data.main.temp)
        return data.main.temp;
    }catch(error){
        console.log(error, "gw error")
    }
}

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  const allData = await request.json()
  }
  catch(error) {
    console.log("error", error);
  }
};


