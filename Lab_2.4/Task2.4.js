function init(){

    
    var w = 500;
    var h = 200;
    var p = 4;
    var barPadding = 1;

    //when running locally i have used gist, on mercury i just use the file name
    d3.csv("https://gist.githubusercontent.com/Kamar-Moon/c23196e30dc019d3059450e57f144840/raw/04d040e1c779ae00bf64e1f6f632304e4a936947/lab2.4_data").then(function(data){
        console.log(data);
        randomAges = data;
        barChart(randomAges);
    });

    function barChart(){
        var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

        //Add Bars
        svg.selectAll("rect")
            .data(randomAges)
            .enter()
            .append("rect")
            .attr("x",  function(d, i){ //set x co , d is data associated with index i
                return i * (w / randomAges.length); //multiply index i by width/number of data points and set x
            })
            .attr("y", function(d){
                return h - (d.ages * 4) - 20 // Adjust the y position to the bottom of the SVG minus the height of each bar
            })
            .attr("width", w / randomAges.length - p ) // width of bars / data points - padding
            .attr("height", function(d){
                return d.ages * 4; //not proper way to scale will look at alt way in week 3
            })
            //.classed("bar", true) 
            
            .attr("fill", function(d) {
            var dataValue = d.ages[1] //access the data in the column
            return "rgb(0, 0, " + (dataValue * 50) + ")"; //change colour of bars based on data value * 50
        })
        svg.selectAll("text")
            .data(randomAges)
            .enter()
            .append("text")
            .text(function(d){
                return d.ages
            })
            .attr("x", function(d,i){
                return i * (w /randomAges.length) + (w / randomAges.length - barPadding) / 2;
            })
            .attr("y", function(d){
                return h - (d.ages * 4) - 22;
            })
            .attr("text-anchor", "middle")
        
        ;
        

         
    };


}
window.onload =init;