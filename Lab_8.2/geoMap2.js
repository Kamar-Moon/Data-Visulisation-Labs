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

    // Colour Scheme
    var colourScheme = ["#8856a7", "#8c96c6", "#b3cde3"]
    var colourScale = d3.scaleQuantize()
                .range(colourScheme)

    // Read in  LGA Unemployment CSV file
    d3.csv("VIC_LGA_unemployment.csv").then(function(data){

        // Process the data // NOTE for learning i did not need to use parseInt because the values in file are already in numeric format, using ParseInt caused NaN error
        var processedData = data.map(function(d) {
            var dataLGA = d.LGA;
            var dataValue = +d.unemployed; // Convert to numeric value using unary plus operator
            return {
                LGA: dataLGA,
                value: dataValue
            };
        });

        // Log processed data to console for verification
        console.log(processedData);

        //set the colour domain
        colourScale.domain([
            d3.min(data, function(d) {return d.value; }),
            d3.max(data, function(d) {return d.value; })
        ]);

        // Load and process GeoJSON file data
        d3.json("LGA_VIC.json").then(function(json){

            // Log the parsed data values
            /*data.forEach(function(d) {
                console.log("Parsed value for " + d.LGA + ": " + d.value);
            });*/

            // Merge the data in the csv and JSON files
            //Loop through once for each csv data value
            for (var i = 0; i < processedData.length; i++) {
            var dataLGA = processedData[i].LGA;
            var dataValue = processedData[i].value;

            for (var j = 0; j < json.features.length; j++) {
                var jsonLGA = json.features[j].properties.LGA_name;
                if (dataLGA === jsonLGA) {
                    json.features[j].properties.value = dataValue;
                    break;
                }
            }}

            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d){

                    //get data value
                    var value = d.properties.value;
                    if (value){
                        //if the value exists...
                        return colourScale(value); 
                    }
                    else{
                        //if the value doesn't exist
                        return "#ccc";
                    }
                })
        });

        
    })   
}
window.onload = init;
