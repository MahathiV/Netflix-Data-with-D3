//import * as d3Select from 'd3-selection'



//console.log(d3.selection.on)

//Bar plot variables

var category_select = d3.selectAll("#top10").on('change',optionChanged)

var categories = []
var category_Counts = []

var category_occurences = []

//Scatter plot variables

//Colors

const colors ={
  Netflix: "Red",
  Hulu: "Blue",
  'Prime Video': "Yellow",
  'Disney+': "Green"
}

const otts = ["Netflix","Hulu","Prime Video","Disney+"];

var IMDb_ratings = []
var Rotten_Tomatoes = []

 // create circles for scatter plot
 var circles

// svg container
var svgHeight = 500;
var svgWidth = 500;

// margins
var margin = {
top: 50,
right: 80,
bottom: 55,
left: 170
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;



//var netflix = []
//var hulu = []
//var disney = []
//var prime_video = []

function page_load()
{
  top10_viewers("Genre")

  scatter_plot()

}

page_load()

function scatter_plot()
{

  //console.log(d3.selectAll("svg").attr("id","svg-scatter1"))

  //var svgarea = d3.select("body").select("svg").attr("id","svg-scatter1");

  //if (svgarea.empty())
  {
    var svg = d3.select("body").select("#svg-area1").append("svg").attr("id","svg-scatter1")
    //.append("h2").text("Hi")
    //append("svg")
    .attr("height", 500)
    .attr("width", 500);

  }

  var svg = d3.select("body").select("#svg-area2").append("svg").attr("id","svg-scatter2")
  //.append("h2").text("Hi")
  //append("svg")
  .attr("height", 500)
  .attr("width", 500);

  //console.log(d3.selectAll("svg").attr("id","svg-scatter1"))

d3.csv("https://raw.githubusercontent.com/ankithacherian/Lab4/main/ott_comparison.csv").then(function(d){  
  
  d.forEach(function(data)
    {

       data.IMDb = +data.IMDb
       data['Rotten Tomatoes'] = +data['Rotten Tomatoes']

       data.Netflix = +data.Netflix
       data['Prime Video'] = +data['Prime Video']
       data.Hulu = +data.Hulu
       data['Disney+'] = +data['Disney+']

    })

  for (var i=0;i<d.length;i++)
  {
      
        if (d[i]['IMDb'] == '')
        {
            d[i]['IMDb'] = 0.0
        }

        if (d[i]['Rotten Tomatoes'] == '')
        {
            d[i]['Rotten Tomatoes'] = 0
        }

        IMDb_ratings.push(d[i]['IMDb'])
        Rotten_Tomatoes.push(d[i]['Rotten Tomatoes'])

  }


var chartGroup = svg.append("g")
.attr("transform",`translate(${margin.left},${margin.top})`)

svg.append("g")
.attr("transform",`translate(${margin.left},${margin.top})`)


// create scale functions

var xLinearScale = d3.scaleLinear()
.domain([d3.min(IMDb_ratings),d3.max(IMDb_ratings)+1])
.range([0,chartWidth]);

var yLinearScale = d3.scaleLinear()
.domain([d3.min(Rotten_Tomatoes)-10,d3.max(Rotten_Tomatoes)])
.range([chartHeight,0])

var bottomAxis = d3.axisBottom(xLinearScale)
var leftAxis = d3.axisLeft(yLinearScale)

chartGroup.append("g")
.attr("transform",`translate(0,${chartHeight})`)
.call(bottomAxis) // x -axis values

chartGroup.append("g")
.call(leftAxis) // y-axis values


 // x and y axis titles (text)

 chartGroup.append("text")
 .attr("transform","rotate(-90)")
 .attr("y",-60)
 .attr("x",0-(chartHeight/2))
 .attr("dy","1em")
 .attr("class","axisText")
 .text("Rotten Tomatoes")

 chartGroup.append("text")
 .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 45})`)
 .attr("class", "axisText")
 .text("IMDb Ratings");
 

 // create circles for scatter plot
//var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);


 for (var i=0;i<d.length;i++)
 {
   //console.log(d[['IMDb']])
     for (var k = 0; k<otts.length ; k++)
     {

        var circles = chartGroup.append("circle")
                                .attr("cx", xLinearScale(d[i]['IMDb']))
                                .attr("cy",yLinearScale(d[i]['Rotten Tomatoes']))
                                .attr("r", d[i][otts[k]] * 5)
                                .attr("id",[otts[k]])
                                .attr("fill",colors[otts[k]])
                                .attr("class","non_brushed")
        // adding tooltips - information on mouseover
                               /* .on("mouseover", (e,d) =>{
                                  tooltip.transition().duration(200).style("opacity",0.9)
                                  tooltip.html(`<p>${otts[k]}<br>
                                  IMDB: ${d[i]['IMDb']} <br>
                                  Rotten Tomatoes: ${d[i]['Rotten Tomatoes']} </p>`)
                                })
                                .on("mouseout",(d) => {
                                   tooltip.transition().duration(500).style("opacity",0)
                                }) */
      }
  }

  //-------------------trial------------------------
//var c = 0
function brushed()
{
   //if (d3.selection.on != null)
   var s = d3.event;
  
   if (s != null) 
   {
        //revert circles to initial style
        //handle.attr("display", "none");
        circles.attr("class", "non_brushed");
   }
   else
   {

    // Using d3.brushSelection to get bounds of the brush
         
    var brush_coords = d3.brushSelection(this);
    //console.log(brush_coords)  

    circles.filter(function (){

        var cx = d3.select(this).attr("cx")  // Getting all the circle coordinates that are within the selected area
        var cy = d3.select(this).attr("cy")

        //console.log(cy)

        //highlight Brushed Circles
        return isBrushed(brush_coords, cx, cy);
        
        })
        .attr("class", "brushed");

        //console.log(cy)
         
        //displayTable(brush_coords, cx, cy)

   }    
        
}

function isBrushed(brush_coords, cx, cy) 
{

  var x0 = brush_coords[0][0]
  var x1 = brush_coords[1][0]
  var y0 = brush_coords[0][1]
  var y1 = brush_coords[1][1]

      //console.log(x0)
      //console.log(cy)

 return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;  // getting the coordinates that are within the brushed circle radii
}

function displayTable()
{
      
      console.log("hi1")
      // disregard brushes w/o selections  
      // ref: http://bl.ocks.org/mbostock/6232537
      if (!d3.selection.on) return;

      //if (!d3.event.selection) return; // Ignore empty selections.
      console.log("hi2")

      //d3.select(this).call(brush.move, null);

      //var b = d3.brush().move(this)

      // clear:
        //(brush.move, null);

        //var a = brush().on(clear,null)
        //console.log(b)

      // to move it programmatically
     //(brush.move, [[0,0], [1,1]]);

      // programmed clearing of brush after mouse-up
      // ref: https://github.com/d3/d3-brush/issues/10
      //d3.select(this).call(brush.clear, null);  //used to set the active selection of the brush on the specified group.

      //d3.select(this).call(brush.move, null);
      //console.log("hi3")

      d3.select(this).call(brush.move, null);

      var d_brushed =  d3.selectAll(".brushed").data();

      //var a = d3.select(this).call(d3.brush().clear)

      //var a = d3.select(this).selectAll('.brushed').call(d3.brush().move)
      //var a = d3.brush().move(this)
      //var a = brush.move(this)
      
      //var a = brush.call(move)
      //console.log(a)

      //var d_brushed =  d3.selectAll(".brushed").data();
      console.log(d_brushed)
      console.log("hi4")

      // populate table if one or more elements is brushed
      //if (d_brushed.length > 0) 
       {
            //clearTableRows();
            //d_brushed.forEach(d_row => populateTableRow(d_row))
        } 
        //else 
        {
            //clearTableRows();
        }




}



//console.log(c)

// Creating a brush
//d3.select("#brush").call(d3.brush().on("brush",brushed)) // Calling a function on brush change

var brush = d3.brush()
           .on("brush",brushed) // Calling a function on brush change
           .on("end", displayTable); 

d3.selectAll("#svg-area2").append("g").call(brush) // Calling a function on brush change


// -------------------trial-------------------------

  
})
}
  

function Bar_Chart(categories,category_Counts,category_select)
{
  var svgarea = d3.select("body").select("svg").attr("id","svg-bar");

  if (!svgarea.empty())
  {
      svgarea.remove();
  }
//d3.selectAll('svg').attr("id","svg-bar").remove()

//d3.select('svg').attr("id","svg-bar").remove()

// create svg container
var svg = d3.select("#svg-area").append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth)
.attr("id","svg-bar");

//d3.selectAll('rect').remove()

// Adding X - Axis label text

svg.append('text')
.attr('x',chartWidth + 100)
.attr('y',chartHeight + 100)
.attr('text-anchor','middle')
.text(category_select)


// shift everything over by the margins
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);


// scale y to chart height
// The inverted range values allows us to make sure that a value of 0 actually anchors to the bottom of the chart.
var xScale = d3.scaleLinear()
.domain([d3.max(category_Counts)+20,0])
.range([chartWidth,0]);

// scale x to chart width
// padding 0.2 = allocate 20% to the space in between the bars
var yScale = d3.scaleBand()
.domain(categories)
.range([chartHeight,0])
.padding(0.2);


// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale)
              .ticks(6);

// set x to the bottom of the chart
chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(xAxis);

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
.call(yAxis);

chartGroup.selectAll('rect')
   .data(category_Counts)
   .enter()
   .append('rect')
   .attr('y', (d, i) => yScale(categories[i]))
   .attr('height',yScale.bandwidth())
   .attr('width', (d,i) => xScale(category_Counts[i]))


   // Adding labels on bars

chartGroup.append("g")
  .attr("font-size",11)
  .selectAll('text')
  .data(category_Counts)
  .join("text")
  .attr('y',(d, i) => yScale(categories[i]) + yScale.bandwidth()/2) 
  .attr('x',(d,i) => xScale(category_Counts[i])+5)
  .text((d, i) => category_Counts[i])
  /*.transition()
  .ease(d3.easeLinear)
  .duration(3000)
  .delay(function (d,i){
    return i
  }) */


}


function create_category_counts(d,category_select)
{


  for (var i=0; i < d.length; i++)
  {

    if (d[i][category_select] == '')
    {
      d[i][category_select] = category_select + " " + "Unknown"
    }

    if (category_occurences[d[i][category_select]])
    {
      category_occurences[d[i][category_select]] += 1
    }
    else
    {
      category_occurences[d[i][category_select]] = 1
    }

  }

  for (key in category_occurences)
  {
    var value = category_occurences[key]

    //console.log(key + " - " + value)

    category_Counts.push(value)
  }

  category_Counts.sort(function(a,b){return b-a})

  category_Counts = category_Counts.slice(0,10)  

  //console.log(category_Counts)

  for (g in category_Counts)
  {
    //console.log(Genre_Counts[g])
    for (key in category_occurences)
  
   {
     

    if(category_Counts[g] == category_occurences[key])
    {
      
      var value = category_occurences[key]


      if (categories.length < 10 && categories.includes(key) == false)
      {
        categories.push(key)
      }

    }
  }
  
}

Bar_Chart(categories.reverse(),category_Counts.reverse(),category_select)

//console.log(categories)

}

function top10_viewers(category_select)
{
  //console.log(category_select)

  if (category_select == "Genre" || category_select == "Language")
  {

  d3.csv("https://raw.githubusercontent.com/ankithacherian/Lab4/main/NetflixOriginals.csv").then(function(d)

      {

         create_category_counts(d,category_select)

      })
  }

  if (category_select == "director" || category_select == "country" || category_select == "cast")
  {
    d3.csv("https://raw.githubusercontent.com/ankithacherian/Lab4/main/netflix_titles.csv").then(function(d){
       
      create_category_counts(d,category_select)
    })
  }

categories = []
category_Counts = []
category_occurences = []

}

//-----------------------------------------------------------------------------------------------
  
function optionChanged ()
{
 var category_select = d3.select("#top10").property("value")
 //console.log(category_select)

 //if (category_select == "Genre" || category_select == "Language")
 {
   //console.log(category_select)
   top10_viewers(category_select)
 }
}




