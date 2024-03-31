function init(){
    var w = 600;
    var h = 250;
   

    var dataset = [15, 25, 24, 8 , 20, 27, 28, 6, 9, 10, 22, 
        24, 13, 18, 19, 21, 32, 30, 36, 11, 33, 37, 32, 12, 17]
    
    
    //scale x axis
    var xScale = d3.scaleBand() //scale for ordinal data
                    .domain(d3.range(dataset.length)) //calculate range of domain
                    .rangeRound([0,w]) // round values to whole number, range of domain from 0 to width of svg
                    .paddingInner([0.05]); //padding 5% of bandwidth

    //Scale y axis - this needs to use linear scale
    var yScale = d3.scaleLinear() 
                .domain([d3.min(dataset), d3.max(dataset)])
                .rangeRound([h, 0]); //avalible space is height of canvas to 0 
    
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
            return d * 4;
        })
        .attr("fill", function(d) { //dynamic fill for bars higher numbers = darker colour
            return "rgb(0, 0, " + Math.round(d * 10) + ")" });
    
    // labels for bars        
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){ return d; })
        .attr("x", function(d, i){ return xScale(i) + xScale.bandwidth() /2; })
        .attr("y", function(d) { return yScale(d); })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

      
    // On button click update with new data
    d3.select("button")
    .on("click", function() {

        var NumValues = dataset.length;
        var maxValue = 25;
        dataset = [];

        for (var i = 0; i < NumValues; i++){
            var newNumber = Math.floor(Math.random()* maxValue); //Math.random generates random number between 0-1, multiply that by maxValue, round to nearest integer with .floor 
            dataset.push(newNumber);
        }

    //Update all rects
    svg.selectAll("rect")
        .data(dataset)
        .join("rect")
        .transition() //<----new transition line
        .delay(function(d, i){
            return i * 100;
        })
        .duration(2000)
        .ease(d3.easeElasticOut)
        .attr("x", function(d, i){
             return xScale(i);
            })
        .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
        .attr("height", function(d){
            return yScale(d);
            })
        .attr("fill", function(d) { //dynamic fill for bars higher numbers = darker colour
            return "rgb(0, 0, " + Math.round(d * 10) + ")" });
    
    //Update labels
    svg.selectAll("text")
        .data(dataset)
        .join("text")
        .transition() //<----new transition line
        .delay(function(d, i){
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
            .attr("y", function(d) {return h - yScale(d) + 16;})
        
       




                         

    })

   


    


}
window.onload=init;