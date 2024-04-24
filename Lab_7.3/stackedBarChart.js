function init(){
    var w = 300;
    var h = 300;

    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    // Create svg element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Colour scheme
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set up Stack method
    var stack = d3.stack()
                    .keys(["apples", "oranges", "grapes"]);

    // Data, stacked
    var series = stack(dataset);

    // Set up scales
    var xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .range([0, w])
                   .paddingInner(0.05);
    
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(series, function(d) {
                       return d3.max(d, function(d) {
                           return d[1];
                       });
                   })])
                   .range([h, 0]);

    // Add a group for each row of data
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d,i){ return color(i)});

    // Add a rect element for each data value
    var rects = groups.selectAll("rect")
                      .data(function(d) {return d;})
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) { return xScale(i % dataset.length); }) // Corrected x position
                      .attr("y", function(d) { return yScale(d[1]); })
                      .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
                      .attr("width", xScale.bandwidth());

}
window.onload = init;
