let data;
let newData;
let csvData = `id,Exercise,Rep,Weight,Date\n1,Bench Press,8,135,2023-01-23
2,Bench Press,10,135,2023-01-24
3,Bench Press,9,155,2023-01-25
4,Bench Press,6,165,2023-01-26
5,Bench Press,3,135,2023-01-27
6,Bench Press,10,175,2023-01-28
7,Bench Press,5,135,2023-01-29
`


function getDataFromPhp(url) {
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(function(response) {
        // check if the response was successful
        if (response.ok) {
          // parse the response as JSON
          response.text().then(function(data) {
            resolve(data);
          });
        } else {
          reject("Error retrieving data from PHP URL.");
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
}


getDataFromPhp("../PHP/getFitness.php")
  .then(function(data) {
    // handle the data here

    setTimeout(function(){
      newData = d3.csvParse(data,(d) =>{
        return {
          id: d.id,
          date: new Date(d.Date),
          exercise: d.Exercise,
          rep: parseInt(d.Rep),
          weight: parseInt(d.Weight),
          volume: parseInt(d.Rep)*parseInt(d.Weight)
        }
      });
      newData.columns.push("volume")



      $("#get-data").click(function(){

})


    var margin = {top:10, right:30, bottom: 30, left: 40},
        width = 460 - margin.left - margin.right,
        height = 155

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate("+ margin.left + ","+ margin.top+")");

    var x = d3.scaleTime()
              .domain([new Date(2023,0,22),new Date(2023,0,31)])
              .range([0,width])
              .nice();

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
              .domain([0,1000])
              .range([height,0]);

    svg.append("g")
        .call(d3.axisLeft().scale(y));

    var line = d3.line()




    svg.append("path")
          .datum(newData)
         .attr("fill", "none")
         .attr("stroke", "#69b3a2")
         .attr("stroke-width", 1.5)
         .attr("d", d3.line()
            .x(function(d){return x(d.date)})
            .y(function(d){return y(d.volume)})


         )
    },5000)

  })
  .catch(function(error) {
    // handle any errors here
    console.error(error);
  });
