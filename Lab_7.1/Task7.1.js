function init(){

    
    var w = 600;
    var h = 300;

    var dataset;


    //when running locally i have used gist, on mercury i just use the file name
    d3.csv("Unemployment_78-95", function(data){
        return {

            date: new Date(+d.year, +d.month-1),
            number: +d.number
        };
    }).then(function(data){
        dataset = data;

        LineChart(dataset);
        console.table(dataset, ["date", "number"]);
    })

    function LineChart(){
        var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            svg.append("path")
                .datum(dataset)
                .attr("class", "line")
                .attr("d", line);

        xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function(d) {return d.date;}),
                        d3.max(dataset, function(d) {return d.date;})
                    ])
                    .range([0, w]) //on the x asis use the space dtarting from 0 up to total width

        yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) {return d.number;})
                    ])
                    .range(h, 0); // on y axis use the space starting from 0 to total height

        line = d3.line()
                 .x(function(d) {return xScale(d.date);})
                 .t(function(d) {return yScale(d.number);});
    };


}
window.onload =init;