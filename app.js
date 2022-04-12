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

//Otts 

const otts = ["Netflix","Hulu","Prime Video","Disney+"];

// ratings
var IMDb_ratings = []
var Rotten_Tomatoes = []

 // create circles for scatter plot
 var circles

// svg container
var svgHeight = 500;
var svgWidth = 500;

// margins
var margin = {
top: 100,
right: 94,
bottom: 55,
left: 160
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;



function page_load()
{
  top10_viewers("Genre")

  scatter_plot()

}

page_load()

function scatter_plot()
{

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



d3.csv("https://raw.githubusercontent.com/ankithacherian/Lab4/main/ott_comparison.csv").then(function(d){  
  
  d.forEach(function(data) // looping through the data
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
      
        if (d[i]['IMDb'] == '') // replacing empty strings to 0
        {
            d[i]['IMDb'] = 0.0
        }

        if (d[i]['Rotten Tomatoes'] == '')
        {
            d[i]['Rotten Tomatoes'] = 0
        }

        IMDb_ratings.push(d[i]['IMDb'])  // taking the arrays for x and y scale
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
 
 // A color scale: one color for each group
 var myColor = d3.scaleOrdinal()
 .domain(Object.keys(colors))  // otts
 .range(Object.values(colors));  // colors


 // create circles for scatter plot
//var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);


 for (var i=0;i<d.length;i++)  // We need d.length * otts.length points on scatter plot to have all 4 columns data to be plotted
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

  // creating legends on the top right

  /*
  var legend = svg.selectAll(".legend")
  .data(myColor.domain().slice())
  .enter().append("g")
  .attr("class","legend")
  .attr("transform",function(d,i) {
    return "translate(0," + i * 20 + ")";
  });

legend.append("circle")
  //.attr("cx",495)
  //.attr("cy",9)
  .attr("cx",475)
  .attr("cy",9)
  .attr("r",4)
  .style("fill",myColor);

legend.append("text")
  //.attr("x",490)
  //.attr("y",18)
  .attr("x",490)
  .attr("y",18)
  //.attr("dy",".35em")
  .style("text-anchor","end")
  .text(function (d) {return d}) */


      /// legend horizontal top

      var legend = svg.selectAll(".legend")
      .data(myColor.domain().slice())
      .enter().append("g")
      .attr("class","legend")
      .attr('transform', (d,i) => `translate(${i * 120},${chartHeight-300})`);


      legend.append('circle')
      .style("fill",myColor)
      .attr('cx', 5)
      .attr('cy', 4)
      .attr('r',4.5)
      //.attr("dy","5em")

    
      legend.append('text')
      .style('font-family', 'Georgia')
      .style('font-size', '13px')
      .attr('x', 17.5)
      .attr('y', 8.5)
      //.attr("dx",".0.05em")
      .text(function (d) {return d})
      

  //------------------- Brushing code start ------------------------
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

//d3.selectAll("#svg-area2").append("g").call(brush) // Calling a function on brush change


// ------------------- brushing code end-------------------------

  
})
}
  

function Bar_Chart(categories,category_Counts,category_select)
{
  var svgarea = d3.select("body").select("svg").attr("id","svg-bar");

  if (!svgarea.empty())
  {
      svgarea.remove();
  }

// create svg container
var svg = d3.select("#svg-area").append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth)
.attr("id","svg-bar");


// Adding X - Axis label text

svg.append('text')
.attr('x',chartWidth + 100)
.attr('y',chartHeight + 145)
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
   .attr("id",(d, i) => i)
   .attr('y', (d, i) => yScale(categories[i]))
   .attr('height',yScale.bandwidth())
   .attr('width', (d,i) => xScale(category_Counts[i]))
   .attr("fill", "firebrick");  //rgb(178,34,34)
   


// Adding labels on bars on mouse over

// Create the event listeners with transitions
chartGroup.selectAll('rect').on("mouseover", function(d,i) {

  //console.log(i)
  var id = d3.select(this).attr("id")

  //console.log(id)
  //console.log(categories[id])
  
  for (key in category_occurences)
{
  if (category_occurences[key] == i && key == categories[id]) // key = categories[id] is to check for duplicate counts for ex action & biopic
  {


    d3.select(this)
    //.transition()
    //.duration(500)
    .attr("fill", "black")

    .attr("stroke-width","0.35ch")
    .attr("stroke","firebrick")
    .attr("cursor","pointer")


     chartGroup
    .append("g")
    .attr("font-size",11)
    .append("text")
    .attr("id","bar-labels")
    .attr("x",function(){
        return (xScale(i)+5); // i is count here
      })
    .attr("y",function(){
       return yScale(key) + yScale.bandwidth()/2 // key is category
      })
    .text(i + " in " + key) 
    
  }
}
  
})   

    .on("mouseout", function() {
      d3.select(this)
            .attr("fill", "firebrick");  //rgb(178,34,34)
            d3.selectAll("#bar-labels").remove()
           
    });

}


function create_category_counts(d,category_select)  //// preparing counts for the selected categories with the data
{


  for (var i=0; i < d.length; i++)
  {

    if (d[i][category_select] == '')
    {
      d[i][category_select] = category_select + " " + "Unknown" // Adding unknown for empty areas in categories
    }

    if (category_occurences[d[i][category_select]])  // Preparing category : counts data in category_occurences
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

    category_Counts.push(value) // adding category counts in the array
  }

  category_Counts.sort(function(a,b){return b-a})  // descending order

  category_Counts = category_Counts.slice(0,10)  // taking top 10

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
        categories.push(key)  // adding categories in the array
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

         create_category_counts(d,category_select) // preparing counts for the selected categories

      })
  }

  if (category_select == "director" || category_select == "country" || category_select == "cast")
  {
    d3.csv("https://raw.githubusercontent.com/ankithacherian/Lab4/main/netflix_titles.csv").then(function(d){
       
      create_category_counts(d,category_select) // preparing counts for the selected categories
    })
  }

categories = []  // Emptying the arrays for next category
category_Counts = []
category_occurences = []

}

  
function optionChanged ()
{
 var category_select = d3.select("#top10").property("value")
 //console.log(category_select)

 top10_viewers(category_select)
 
}




