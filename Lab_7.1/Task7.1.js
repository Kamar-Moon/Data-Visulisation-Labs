function init(){

    
    var w = 600;
    var h = 300;

    var dataset;

    var rowCoverter = function(d){
        return{
            //Make new data object to combine year and month
            // the + forces the d.year and d.month to be typed as numbers not strings
            date: new Date(+d.year, (+d.month - 1)), //must be -1 becuase javascript month starts at 0
            //convert number from string to int
            number: parseInt(+d.number)
        };
    }


    //when running locally i have used gist, on mercury i just use the file name
    d3.csv("Unemployment_78-95.csv", rowCoverter, function(d){
        var dataset = data;

        //print data to console as table

    }).then(function(data){
        dataset = data; // for troubleshooting data type
        console.log(dataset); //display the resulting table of data
        LineChart(dataset);
        console.table(dataset, ["date", "number"]);
    })

    

    function LineChart(){
        var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

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
                .y(function(d) {return yScale(d.number);});

        svg.append("path") // must put code here to i do not get "line not defined error"
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line);
    };


}
window.onload =init;