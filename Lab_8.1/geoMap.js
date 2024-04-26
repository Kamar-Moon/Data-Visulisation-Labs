function init(){
    var w = 500;
    var h = 300;
    
    var projection = d3.geoMercator() // Make lon/lat coordinates into x/y
                    .center([145, -36.5])
                    .translate([w / 2, h / 2])
                    .scale(2450);
                    
    var path = d3.geoPath() // Convert GeoJSON geometrics into SVG path strings
                .projection(projection); // make sure projection path is set correctly to x/y surface

    // Create svg element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

    // Read in JSON file
    d3.json("LGA_VIC.json").then(function(json){

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    });


}
window.onload = init;
