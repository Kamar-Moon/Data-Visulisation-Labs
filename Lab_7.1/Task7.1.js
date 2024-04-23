function init() {
    var w = 700;
    var h = 400;
    var p = 60;

    var dataset;

    d3.csv("Unemployment_78-95.csv")
    .then(function(data) { //The .then() function is chained onto the promise returned by d3.csv()
        dataset = data.map(function(d) {
            var year = +d.year; //get year from dataset
            var month = +d.month; //get month from dataset
            var date = new Date(year, month - 1); // combine year and month in new Date object, 
            return {                             // -1 becuase JavaScriptmonth starts at 0
                date: date,
                number: +d.number
            };
        });
        console.log(dataset); //display the dataset to console
        LineChart(); // Call LineChart inside the .then() block after dataset is populated.
    });

    function LineChart() {
        var svg = d3.select("body")
                .append("svg")
                .attr("width", w + 2 * p)
                .attr("height", h + 2 * p);

            //Chart Heading
            svg.append("text")
                .attr("class", "graph-title")
                .attr("x", (w + 2 * p) / 2) // Center horizontally
                .attr("y", p / 2) // Position at the top of the chart
                .attr("text-anchor", "middle") // Center text horizontally
                .text("Number of Unemployed in Australia");

        var xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; })
                    ])
                    .range([p,w + p]); //on the x axis use the space starting from 0 up to total width

        var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) { return d.number; })])
                    .range([h, 0]);  // on y axis use the space starting from height to 0

        //Create Line data            
       /* var line = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.number); });

        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line);*/

        //Add area chart
        area = d3.area()
                .x(function(d) {return xScale(d.date); })
                //base line for area
                .y0(function() {return yScale.range()[0]; })
                .y1(function(d) {return yScale(d.number); })

        // Append the area chart
        svg.append("path")
            .datum(dataset)
            .attr("class", "area area-fill")
            .attr("d", area);

        // -----> Define Y Axis Code <-----
        var yAxis = d3.axisLeft()
                .scale(yScale);
                
        
        // -----> Define X Axis Code <-----        
        var xAxis = d3.axisBottom()
            .scale(xScale);
            

        // -----> code for X axis ticks (little lines with numbers) <-----  
        svg.append("g")
        .attr("transform", "translate(0, "+ (400) + ")") //move xAxis to height of svg. 0 horizontal
        .call(xAxis);  
        
        
        // -----> code for Y axis ticks (little lines with numbers) <-----    
        svg.append("g")
            .attr("transform", "translate(" + (p) + ", 0)") // the 0 here means no vertical movement
            .call(yAxis);

        // Add horizontal dashed line at y = 500,000
        svg.append("line")
            //start of line
            .attr("x1", p)
            .attr("y1", yScale(500000))
            //end of line
            .attr("x2", w + p)
            .attr("y2", yScale(500000))
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5"); // Optional: Add dashed style

        // Add Text for Half Million line
        svg.append("text")
            .attr("class", "halfMillText")
            .attr("x", p + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed");

    }
}

window.onload = init;
