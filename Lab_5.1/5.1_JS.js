function init(){
            //button to update data
        
            

            var w = 500;
            var h = 200;
            margine = 20
    
            var dataset = [15, 25, 25, 8 , 20, 27, 28]      
    
            var xScale = d3.scaleBand() //scale for ordinal data
                            .domain(d3.range(dataset.length)) //calculate range of domain
                            .rangeRound([0,w]) //range of domain from 0 to width of svg
                            .paddingInner([0.05]); //padding 5% of bandwidth
    
    
            var yScale = d3.scaleBand()
                            .domain(d3.range(dataset.length))
                            .rangeRound([0, d3.max(dataset, function(d){
                                return d[0];
                            })]);
    
    
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
              
    
            // Add y-axis label
            /*svg.append("text")
                .attr("class", "axis-label")
                .attr("transform", "rotate(-90)")
                .attr("x", -h / 2)
                .attr("y", 15)
                .attr("text-anchor", "middle")
                .text("Energy %")
                .classed("axis-label", true);
    
            // Add graph title
            svg.append("text")
                .attr("class", "graph-title")
                .attr("x", w / 2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .text("Energy Levels Throughout Week")
                .classed("graph-title", true);   */

}
window.onload=init;