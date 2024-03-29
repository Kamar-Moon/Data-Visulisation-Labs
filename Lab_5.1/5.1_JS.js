function init(){
            var w = 500;
            var h = 200;
            margine = 20
    
            var dataset = [15, 25, 25, 8 , 20, 27, 28]
            
            

               
    
            //scale x axis
            var xScale = d3.scaleBand() //scale for ordinal data
                            .domain(d3.range(dataset.length)) //calculate range of domain
                            .rangeRound([0,w]) //range of domain from 0 to width of svg
                            .paddingInner([0.05]); //padding 5% of bandwidth
    
            //Scale y axis
            var yScale = d3.scaleBand()
                            .domain(d3.range(dataset.length))
                            .rangeRound([0, d3.max(dataset, function(d){
                                return d[0];
                            })]);
    
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
                    return i * (w / dataset.length);
                })
                .attr("y", function(d){
                    return h - (d * 4) - 20 // Adjust the y position to the bottom of the SVG minus the height of each bar
                })
                .attr("width", xScale.bandwidth() ) // width of bars / 5 data points - padding
                .attr("height", function(d){
                    return d * 4; //not proper way to scale will look at alt way in week 3
                })
                .classed("bar", true);            
              
            // On button click update with new data
            d3.select("#update")
            .on("click", function() {
                
                //new values for dataset
                var dataset = [11, 12, 15, 20, 18, 17, 23, 25, 5, 21, 22, 25];

                //Update all rects
                svg.selectAll("rect")
                    .data(dataset)
                    .attr("y", function(d) {
                        return h - yScale(d);
                        console.log("value of y for d = " + d + ": " + y);
                        return y;
                    })
                    .attr("height", function(d){
                        return yScale(d);
                    });
            });
    
        
}
window.onload=init;