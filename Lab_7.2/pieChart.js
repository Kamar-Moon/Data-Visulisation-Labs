function init(){
    var w = 300;
    var h = 300;

    var dataset = [5, 10, 20, 45, 6, 25];

    // Create svg element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var outerRadius = w/2;
    var innerRadius = 0; // the value is 0 becuase we don't want a smaller circle within our large circle
    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    var pie = d3.pie()

    // Create new groups for each incoming wedge 
    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
        // Draw acr paths            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function(d,i) {return arc(d,i); });

       

        // Labels 
        arcs.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; }) // centroid is calculated center point of shape
            .attr("text-anchor", "middle")
            .text(function(d){ return d.value;}) // with d.value we reference the array of objects
            .attr("class", "text");

}
window.onload = init;