let data;

let dataSet = '{"0":{"id":"6","Exercise":"Bench Press","Rep":"8","Weight":"135","Date":"2023-01-23"},"1":{"id":"7","Exercise":"Bench Press","Rep":"4","Weight":"155","Date":"2023-01-23"},"2":{"id":"8","Exercise":"Bench Press","Rep":"6","Weight":"135","Date":"2023-01-23"},"3":{"id":"9","Exercise":"Bench Press","Rep":"6","Weight":"135","Date":"2023-01-23"},"4":{"id":"10","Exercise":"Bench Press","Rep":"10","Weight":"135","Date":"2023-01-26"},"5":{"id":"11","Exercise":"Bench Press","Rep":"6","Weight":"145","Date":"2023-01-26"},"6":{"id":"12","Exercise":"Bench Press","Rep":"3","Weight":"145","Date":"2023-01-26"},"7":{"id":"13","Exercise":"Bench Press","Rep":"7","Weight":"135","Date":"2023-01-26"},"8":{"id":"14","Exercise":"Bench Press","Rep":"10","Weight":"135","Date":"2023-01-30"},"9":{"id":"15","Exercise":"Bench Press","Rep":"6","Weight":"155","Date":"2023-01-30"},"10":{"id":"16","Exercise":"Bench Press","Rep":"4","Weight":"155","Date":"2023-01-30"},"11":{"id":"17","Exercise":"Bench Press","Rep":"5","Weight":"155","Date":"2023-01-30"},"12":{"id":"18","Exercise":"Bench Press","Rep":"3","Weight":"135","Date":"2023-01-30"},"13":{"id":"19","Exercise":"","Rep":"0","Weight":"0","Date":"0000-00-00"}}'

let jsonSet = JSON.parse(dataSet)

function loadData(){
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(){
    console.log("Test")
    data = this.responseText;



  }
  xhttp.open("GET","../PHP/getFitness.php", true);
  xhttp.send();
  return data;
}

$("#get-data").click(function(){
    //console.log(loadData());
    console.log(jsonSet);
})
