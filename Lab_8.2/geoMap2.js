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
    var colourScale = d3.scaleQuantize()
                .range(["rgb(117,107,177)", "rgb(188,189,220)", "rgb(239,237,245)"])

    // Read in  LGA Unemployment CSV file
    d3.csv("VIC_LGA_unemployment.csv").then(function(data){

        //set the colour domain
        colourScale.domain([
            d3.min(data, function(d) {return d.value; }),
            d3.max(data, function(d) {return d.value; })
        ]);

        
        // Load and process GeoJSON file data
        d3.json("LGA_VIC.json").then(function(json){

            
            // Merge the data in the csv and JSON files
            //Loop through once for each csv data value
            for (var i = 0; i < data.length; i++) {

            var dataLGA = data[i].LGA;

            var dataValue = data[i].unemployed;

            //console.log("DataLGA " + dataLGA + " DataValue " + dataValue);

            //find corrosponding LGA inside the GeoJSON file
            for (var j = 0; j < json.features.length; j++) {

                var jsonLGA = json.features[j].properties.LGA_name;

                if (dataLGA == jsonLGA) {

                    json.features[j].properties.value = dataValue;
                    console.log("Value being in JSON properties " + json.features[j].properties.value)

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
                    console.log( "value being returned from jason " + value)
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
    });
  
}
window.onload = init;
