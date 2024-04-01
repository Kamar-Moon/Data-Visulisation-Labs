function init() {
    var w = 600;
    var h = 250;
    var padding = 50;

    var dataset = [
        15, 25, 24, 8, 20, 22, 28, 6, 9, 10, 22, 
        24, 13, 18, 19, 21, 16, 25, 24, 11, 33, 23, 19, 12, 17
    ];

    // Scale x axis
    var xScale = d3.scaleBand() // Scale for ordinal data
                    .domain(d3.range(dataset.length)) // Calculate range of domain
                    .rangeRound([0, w]) // Round values to whole number, range of domain from 0 to width of svg
                    .paddingInner([0.05]); // Padding 5% of bandwidth

    // Scale y axis - this needs to use linear scale
    var yScale = d3.scaleLinear() 
                    .domain([0, d3.max(dataset)])
                    .rangeRound([h, 0]); // Available space is height of canvas to 0

    // Add svg canvas
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    // Add Bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - (d * 4); // Adjust the y position to the bottom of the SVG minus the height of each bar
        })
        .attr("width", xScale.bandwidth()) // Width of bars / 5 data points - padding
        .attr("height", function(d) {
            return d * 4;
        })
        .attr("fill", function(d) { // Dynamic fill for bars higher numbers = darker colour
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
        });
    
    // Labels for bars        
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - (d * 4) + 16;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    // Regular Update code
    d3.select("#updatePlain")
        .on("click", function() {
            var NumValues = dataset.length; //number of data values to generate = length of original dataset
            var maxValue = 25; // the largest number that can be added
            dataset = [];

            for (var i = 0; i < NumValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue); // Math.random generates random number between 0-1, multiply that by maxValue, round to nearest integer with .floor 
                dataset.push(newNumber);
            }

            // Update all rects
            svg.selectAll("rect")
                .data(dataset)
                .join("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) { // Dynamic fill for bars higher numbers = darker colour
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });
    
            // Update labels
            svg.selectAll("text")
                .data(dataset)
                .join("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 16;
                });
        });

     // Transition 1 code
     d3.select("#tran1")
     .on("click", function() {
         var NumValues = dataset.length; //number of data values to generate = length of original dataset
         var maxValue = 25; // the largest number that can be added
         dataset = [];

         for (var i = 0; i < NumValues; i++) {
             var newNumber = Math.floor(Math.random() * maxValue); // Math.random generates random number between 0-1, multiply that by maxValue, round to nearest integer with .floor 
             dataset.push(newNumber);
         }

         // Update all rects
         svg.selectAll("rect")
             .data(dataset)
             .join("rect")
             .transition() //<----new transition line
             .delay(function(d, i) {
                 return i * 100;
             })
             .duration(2000)
             .ease(d3.easeElasticOut)
             .attr("x", function(d, i) {
                 return xScale(i);
             })
             .attr("y", function(d) {
                 return h - yScale(d);
             })
             .attr("width", xScale.bandwidth())
             .attr("height", function(d) {
                 return yScale(d);
             })
             .attr("fill", function(d) { // Dynamic fill for bars higher numbers = darker colour
                 return "rgb(0, 0, " + Math.round(d * 10) + ")";
             });
 
         // Update labels
         svg.selectAll("text")
             .data(dataset)
             .join("text")
             .transition() //<----new transition line
             .delay(function(d, i) {
                 return i * 100;
             })
             .duration(2000)
             .ease(d3.easeElasticOut)
             .text(function(d) {
                 return d;
             })
             .attr("x", function(d, i) {
                 return xScale(i) + xScale.bandwidth() / 2;
             })
             .attr("y", function(d) {
                 return h - yScale(d) + 16;
             });
     });  
     
     // Transition 2 code
     d3.select("#tran2")
     .on("click", function() {
         var NumValues = dataset.length; //number of data values to generate = length of original dataset
         var maxValue = 25; // the largest number that can be added
         dataset = [];

         for (var i = 0; i < NumValues; i++) {
             var newNumber = Math.floor(Math.random() * maxValue); // Math.random generates random number between 0-1, multiply that by maxValue, round to nearest integer with .floor 
             dataset.push(newNumber);
         }

         // Update all rects
         svg.selectAll("rect")
             .data(dataset)
             .join("rect")
             .transition() //<----new transition line
             .delay(function(d, i) {
                 return i * 100;
             })
             .duration(2000)
             .ease(d3.easeCircleIn)
             .attr("x", function(d, i) {
                 return xScale(i);
             })
             .attr("y", function(d) {
                 return h - yScale(d);
             })
             .attr("width", xScale.bandwidth())
             .attr("height", function(d) {
                 return yScale(d);
             })
             .attr("fill", function(d) { // Dynamic fill for bars higher numbers = darker colour
                 return "rgb(0, 0, " + Math.round(d * 10) + ")";
             })
             .on("end", function(){ // Transition for labels starts after bars transition ends
                // Update labels
                    svg.selectAll("text")
                    .data(dataset)
                    .join("text")
                    .transition() //<----new transition line
                    .delay(function(d, i) {
                        return i * 100;
                    })
                    .duration(1000)
                    .ease(d3.easeCircleIn)
                    .text(function(d) {
                        return d;
                    })
                    .attr("x", function(d, i) {
                        return xScale(i) + xScale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                        return h - yScale(d) + 16;
                    });

             });
 
         
     }); 
}
window.onload = init;
