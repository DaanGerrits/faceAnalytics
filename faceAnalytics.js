document.getElementById('analyzeButton').addEventListener('click', analyze);

var apiKey = "17a26f2fbc9240aebfb272df98928812";

function analyze(){
  var src = document.getElementById('userInput').value;
  document.getElementById('face').src = src;

  var request = new Request('https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributess=age,gender', initObject);

  var reqBody = {
    "url": src
  }
  var reqHeader = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-key': apiKey
  });

  var initObject = {
    method: 'POST',
    body: reqBody,
    header: reqHeader
  }

  fetch(request).then(function(response){
    if(response.ok){
      return response.json();
    }
    else{
      return Promise.reject(new Error(reponse.statusText));
    }
  }).then(function(response){
    document.getElementById('age').innerHTML = "Age: " + response.documents[0].age;
    document.getElementById('gender').innherHTML = "Gender: " + response.documents[0].gender;
  }).catch(function(err){
    alert(err);
    document.getElementById('age').innerHTML = "Not able to analyze";
  })
}
