function init(){ 

        // Dynamic random data set
        //initilize empty array, loop through 20 times choose 2 random numbers
        //each time add that pair to the dataset array
        //will produce new dataset everytime page is refreshed
        var dataset = [];
        var numDataPoints = 10;
        var xRange = Math.random() * 1000;
        var yRange = Math.random() * 1000;
        for (var i =0; i <numDataPoints; i++){
            var newNumber1 = Math.floor(Math.random() * xRange);
            var newNumber2 = Math.floor(Math.random() * yRange);
            dataset.push([newNumber1, newNumber2]);
        }


        var w = 500;
        var h = 400;
        var p = 30; //padding

        var xScale = d3.scaleLinear() //scale for the x value
                        .domain([d3.min(dataset, function(d){//calculate min value
                            return d[0]; //first data point in array
                        }),
                        d3.max(dataset, function(d){ //calculate max
                            return d[0];
                        })])
                        .range([p, w - p * 2]); //w is width of svg canvas



        var yScale = d3.scaleLinear() //scale for the y value
                        .domain([d3.min(dataset, function(d){//calculate min value
                            return d[1]; //first data point in array
                        }),
                        d3.max(dataset, function(d){ //calculate max
                            return d[1];
                        })])
                        .range([h - p, p]); //h is height of svg canvas      
         
        var rScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset, function(d){ return d[1]; })]) 
                        .range([2, 5])               

        //SVG canvas                
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        
        // -----> Define Y Axis Code <-----
        var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(5);

        //Add Circles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx",  function(d, i){
                return xScale(d[0]);
            })
            .attr("cy", function(d){
                return yScale(d[1]);
            })
            .attr("r", function(d){
                return rScale(d[1]);

            })
            
            //circle colour
            .attr("fill", function(d) {
                var dataValue = d[1] //access the second value y in an inner array
                return "rgb(0, 0, " + (dataValue * 5) + ")"; //change colour of circle based on y value * 5
            })

            //labels Code
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d){
                return d[0] + "," + d[1]
            })
            //get x and y coordinates from data values [0] and [1]
            .attr("x", function(d){
                return xScale(d[0]);
            })
            .attr("y",function(d){
                return yScale(d[1]);
            })
            //styles
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("fill", "red");

        // -----> X Axis Code <-----        
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);
            
        // code for x axis ticks (little lines with numbers)    
        svg.append("g")
        .attr("transform", "translate(0, "+ (h- p) + ")") //move xAxis  h - padding in the vertical direction i.e down move it 0 horizontal
        .call(xAxis);  
        
        
        // -----> code for Y axis ticks (little lines with numbers) <-----    
        svg.append("g")
            .attr("transform", "translate(" + (p) + ", 0)") // the 0 here means no vertical movement
            .call(yAxis);

    
}                             
window.onload=init;