
console.log("Index.js is executing")
const apikey = '9w2fwsrpru'

function searchTrains()
{
    var result = document.getElementById('resultArea')
    result.innerHTML = "please wait!!! Searching........... "

    var source = document.getElementById('source').value
    var destination = document.getElementById('destination').value
    var date_ = document.getElementById('date').value
    console.log(date_)
    var date = date_[8]+date_[9]+"-"+date_[5]+date_[6]+"-"+date_[0]+date_[1]+date_[2]+date_[3]
    console.log(source + " " + destination + " " + date)
    console.log("fetch called")
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = false;
    

    xhr.addEventListener("readystatechange", function(event){
        if(this.readyState == 4)
        {
            result.innerHTML = ""
            console.log(this.responseText)
            var responseObj = JSON.parse(this.responseText)

            responseObj.trains.forEach(element => {
                var div = document.createElement('div')

                div.style = "margin-top: 20px; border: 2px solid black"

                var h3 = document.createElement('h3')
                h3.innerHTML = element.name + '(' + element.number + ')'

                var h4 = document.createElement('h4')
                h4.innerHTML = element.from_station.name + '(' + element.src_departure_time + ')' + '--------------->' + element.to_station.name + '(' + element.dest_arrival_time + ')'
                var h4_ = document.createElement('h4')
                
                var span = document.createElement('span')

                element.classes.forEach(val =>{
                    var btn = document.createElement('button')
                    btn.innerHTML = val.code
                    span.appendChild(btn)
                })

                h4_.innerHTML = 'Classes Available : '  

                div.appendChild(h3)
                div.appendChild(h4)
                div.appendChild(h4_)
                div.appendChild(span)

                result.appendChild(div)
            });
            
            console.log(responseObj)
        }
    });

    xhr.open('GET', `https://api.railwayapi.com/v2/between/source/${source}/dest/${destination}/date/${date}/apikey/${apikey}/`,true)
    xhr.send(null)
    return true;
}

function pnrStatus()
{
    document.getElementById('resultArea').innerHTML = "please wait!! Searching...."
    console.log("pnr called")
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function (event) {
        if (this.readyState === 4) {
            console.log(this.responseText)
            var responseObj = JSON.parse(this.responseText)
            document.getElementById('resultArea').innerHTML = ""
            var li = document.createElement('li')
            li.innerHTML = responseObj.error

            document.getElementById('resultArea').appendChild(li)
            alert(responseObj.error)
        }
    });

    xhr.open("GET", "https://indianrailways.p.rapidapi.com/index.php?pnr=1234567890");
    xhr.setRequestHeader("x-rapidapi-host", "indianrailways.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "00ae3d8070msh1e9642024fc626dp11426ajsn167355396e7b");

    xhr.send(data);
}

function track()
{
    const trainNo = document.getElementById('trainno').value
    const date_live = document.getElementById('date_live').value
    const stn_code = document.getElementById('code_live').value

    document.getElementById('resultArea').innerHTML = "Please Wait!! Searching....."

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function (event) {
        if (this.readyState === 4) {
            console.log(this.responseText)
            var responseObj = JSON.parse(this.responseText)
            document.getElementById('resultArea').innerHTML = ""
            var li = document.createElement('li')
            var li2 = document.createElement('li')
            li.innerHTML = responseObj.train.name
            li2.innerHTML = responseObj.position

            document.getElementById('resultArea').appendChild(li)
            document.getElementById('resultArea').appendChild(li2)
            alert(responseObj.position)
              
        }
    });

    xhr.open("GET", `https://api.railwayapi.com/v2/live/train/${trainNo}/station/${stn_code}/date/${date_live}/apikey/${apikey}/`);
    xhr.send(null);

    return true

}

function suggestStations(id)
{
    // var result = document.getElementById('result')

    // console.log("Suggestions called")
    // var partial = document.getElementById(id).value
    // var data = null;

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = false;

    // xhr.addEventListener("readystatechange", function (event) {
    //     if (this.readyState === 4) {
    //         var responseObj = JSON.parse(this.responseText)

    //         result.innerHTML = ""

    //         console.log(responseObj)


    //           responseObj.stations.forEach(element => {
    //              var button = document.createElement('button')
    //              button.innerHTML = element.name;
    //              var li = document.createElement('li')
    //              li.appendChild(button)
    //              result.appendChild(li)
    //              })
    //     }
    // });

    // xhr.open("GET", `https://api.railwayapi.com/v2/suggest-station/name/${partial}/apikey/${apikey}/`);
    // xhr.send(data);

    // return true
}

// function for Autopopulate using select2 in jquery
