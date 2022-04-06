var IMDb_ratings = []
var Rotten_Tomatoes = []

var netflix = []
var hulu = []
var disney = []
var prime_video = []


d3.csv("https://raw.githubusercontent.com/ankithacherian/Lab4/main/ott_comparison.csv").then(function(d){
    //console.log(d[0])

    for (var i=0;i<d.length;i++)
    {
        //if (d[i]['IMDb'])
        if (d[i]['IMDb'] == '')
        {
            d[i]['IMDb'] = 0.0
        }

        if (d[i]['Rotten Tomatoes'] == '')
        {
            d[i]['Rotten Tomatoes'] == 0
        }
    
        
        IMDb_ratings.push(d[i]['IMDb'])
        Rotten_Tomatoes.push(d[i]['Rotten Tomatoes'])

        netflix.push(d[i]['Netflix'])
        prime_video.push(d[i]['Prime Video'])
        hulu.push(d[i]['Hulu'])
        disney.push(d[i]['Disney+'])
        
    }
})

console.log(IMDb_ratings)
console.log(Rotten_Tomatoes)

console.log(netflix)
console.log(prime_video)
console.log(hulu)
console.log(disney)

// svg container
var svgHeight = 500;
var svgWidth = 500;

// margins
var margin = {
top: 50,
right: 50,
bottom: 55,
left: 55
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

//d3.selectAll('svg').select("#svg-area2").remove()

var svg = d3.select("#svg-area1").append("svg").attr("id","svg-bar")
//.append("h2").text("Hi")
//append("svg")
.attr("height", 600)
.attr("width", 600);

// create svg container
var svg = d3.select("#svg-area2").append("svg").attr("id","svg-scatter")
//.append("h2").text("Hi")
//append("svg")
.attr("height", 500)
.attr("width", 500);


//var chartGroup = svg.append("g")
//.attr("transform",`translate(${margin.left},${margin.top})`)

//svg.append("g")
//.attr("transform",`translate(${margin.left},${margin.top})`)



/* 

/ create scale functions

var xLinearScale = d3.scaleLinear()
.domain([d3.min(IMDb_ratings),d3.max(IMDb_ratings)])
.range([0,chartWidth]);

var yLinearScale = d3.scaleLinear()
.domain([d3.min(Rotten_Tomatoes),d3.max(Rotten_Tomatoes)])
.range([chartHeight,0])

console.log(xLinearScale)

console.log(yLinearScale.domain)


var bottomAxis = d3.axisBottom(xLinearScale)
var leftAxis = d3.axisLeft(yLinearScale)


// append axis to charts

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
 .text("Lacks Healthcare(%)")

 chartGroup.append("text")
 .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 45})`)
 .attr("class", "axisText")
 .text("In Poverty(%)");


*/

