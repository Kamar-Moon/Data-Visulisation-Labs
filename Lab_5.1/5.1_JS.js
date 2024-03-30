function init(){
    var w = 500;
    var h = 200;
    margine = 20

    var dataset = [15, 25, 25, 8 , 20, 27, 28]
    
    
    //scale x axis
    var xScale = d3.scaleBand() //scale for ordinal data
                    .domain(d3.range(dataset.length)) //calculate range of domain
                    .rangeRound([0,w]) // round values to whole number, range of domain from 0 to width of svg
                    .paddingInner([0.05]); //padding 5% of bandwidth

    //Scale y axis - this needs to use linear scale
    var yScale = d3.scaleLinear() 
                .domain([d3.min(dataset), d3.max(dataset)])
                .range([h, 0]); //h is height of svg canvas 

    //add svg canvas
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    //Add Bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x",  function(d, i){
            return xScale(i);
        })
        .attr("y", function(d){
            return h - (d * 4) - 20 // Adjust the y position to the bottom of the SVG minus the height of each bar
        })
        .attr("width", xScale.bandwidth() ) // width of bars / 5 data points - padding
        .attr("height", function(d){
            return d * 4; //not proper way to scale will look at alt way in week 3
        })
        .classed("bar", true);            
      

      var  dataset = [11, 12, 13, 14, 15, 16, 17];
    // On button click update with new data
    d3.select("button")
    .on("click", function() {

        //Update all rects
        svg.selectAll("rect")
            .data(dataset)
            .join("rect")
            .attr("x", function(d, i){
                return xScale(i)
            })
            .attr("y", function(d) {
                
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){
                return yScale(d);
            });
    });


    


}
window.onload=init;