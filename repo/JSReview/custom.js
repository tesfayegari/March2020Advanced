
var data = "Test";
function calculateSquareroot(){
  var data = document.getElementById('userData').value*1;
  // var data = userData*1;

  var result = Math.sqrt(data);
  document.getElementById('output').innerHTML = result;  
  
}

var row1 = {
  Title: "Tesfaye Ethiopia Visit",
  Description: "Going to Ethiopia",
  Request_x0020_Type: "Vacation",
  age: 40,
  lookup: {
    Tiltle: "Test",
    ID: 4
  },
  SayName: function(){console.log(this.Title);}
}
var row1JSON = {
  "Title": "Tesfaye Ethiopia Visit",
  "Description": "Going to Ethiopia",
  "Request_x0020_Type": "Vacation",
  "Age": 40,
  "lookup": {
    Tiltle: "Test",
    ID: 4
  }

}

JSON.stringify(row1)
JSON.parse(row1JSON)

