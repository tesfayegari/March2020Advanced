//ECASCript 6 and 7
//declaring variable 
let movie = 'Lord of the Rings'; //{1}
var movie = 'Batman v Superman'; //throws error, variable movie already declared
function starWarsFan(){
 let movie = 'Star Wars'; //{2}
 return movie;
}
function marvelFan(){
 movie = 'The Avengers'; //{3}
}

//Template Literal 
var fName = "Tesfaye";
var lName = "Gari";
var fullName = fName + " " + lName;
fullName = `${fName} ${lName}`;

var myHtml = '<input type="number" id="userData">' + 
      '<input type="button" value="Calculate Square Root" onclick="calculateSquareroot()">' +
'<br>' +
'<h3 id="output"></h3>';

myHtml = `<input type="number" id="userData">
          <input type="button" value="Calculate Square Root" onclick="calculateSquareroot()">
          <br>
          <h3 id="output"></h3>`;

//Desctructuring
var a = 5;
var b = 50;
//Swap a and b 
var temp = b;
b= a;
a=temp;
[a,b] = [b,a];
var a = ['a','b','10'];
var b = [4,5,6];
var c = [...a,5,6,...b] //[anythingOnA,5,6,AnythingOnB]

function funcName(){
  ///
}
var funName = function(){
  //
}

funName = () =>{}
