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
    d3.select("#add")
    .on("click", function() {
        var maxValue = 25; // the largest number that can be added
        var newNumber = Math.floor(Math.random() * maxValue); // Generate a new random number
        dataset.push(newNumber); // Add the new number to the dataset

        xScale.domain(d3.range(dataset.length)); // Update xScale domain

        // Update all rects
        var bars = svg.selectAll("rect")
            .data(dataset);

        var labels = svg.selectAll("text")
            .data(dataset);    

        bars.enter() //add extra new elements if required
            .append("rect") //create new rectangle
            .attr("x", w)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .merge(bars)
            .attr("x", function(d, i){ //update x value
                return xScale(i);
            })   
            .attr("y", function(d){
                return h - yScale(d);
            }) 
            .attr("width", xScale.bandwidth()) //update width value
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", function(d) { // Dynamic fill for bars lower number = darker colour
                return "rgb(0, 0, " + Math.round(d * 10) + ")";
            });

        // Update labels
        labels.enter()
            .append("text")
            .merge(labels)
            .transition()
            .ease(d3.easeCircleIn)
            .duration(500)
            .text(function(d) {
                    return d;
                })
            .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
            .attr("y", function(d) {
                    return h - yScale(d) + 16;
                })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white")
            .attr("text-anchor", "middle");
    });

    d3.select("#remove")
        .on("click", function(){

        xScale.domain(d3.range(dataset.length)); // Update xScale domain

        // Update all rects
        var bars = svg.selectAll("rect")
        .data(dataset);

        var labels = svg.selectAll("text")
            .data(dataset); 

            dataset.shift();

            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();

            labels.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove()

    })
}
window.onload = init;
