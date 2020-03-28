
var data = "Test";
function calculateSquareroot() {
  var data = $('#userData').val();//document.getElementById('userData').value * 1;
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
  SayName: function () { console.log(this.Title); }
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

var today = new Date()
var dob = new Date('4/1/2010')

var pet1 = {name: 'Buchi', Age: 3}
var person1 = { 
  fName: 'Tesfaye', 
  lName: 'Gari', 
  DOB: '4/1/2010', 
  Phone: '571-205-5738',
  numberOfPets: 3,
  pet: pet1,
  car: {make: 'Toyota', model: 'Dx', Year: '2004' },
  Age: (new Date()).getFullYear() - (new Date(this.DOB)).getFullYear()
}

var person1Json = { 
  "fName": 'Tesfaye', 
  "lName": 'Gari', 
  "DOB": '4/1/2010', 
  "Phone": '571-205-5738',
  "numberOfPets": 3,
  "pet": JSON.stringify(pet1),
  "car": {"make": 'Toyota', "model": 'Dx', "Year": '2004' },
  
}

