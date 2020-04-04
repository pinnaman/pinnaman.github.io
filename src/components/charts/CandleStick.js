<!DOCTYPE html>
<meta charset="utf-8">
<style>
    body {
        font: 10px sans-serif;
    }

    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .bar {
        fill: steelblue;
    }

    .x.axis path {
        display: none;
    }
</style>
<body>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script type="text/javascript">
var twoHundredDayCandleStickChart = [];

//pulling from 2 properties so must do this way
@for (int i = 0; i != 100; ++i)
    {
        @:twoHundredDayCandleStickChart.push({date: '@Model.DailyTimeSeriesData.Data.ElementAt(i).Key', high: '@Model.DailyTimeSeriesData.Data.ElementAt(i).Value.high', low: '@Model.DailyTimeSeriesData.Data.ElementAt(i).Value.low', open: '@Model.DailyTimeSeriesData.Data.ElementAt(i).Value.open', close: '@Model.DailyTimeSeriesData.Data.ElementAt(i).Value.close', sma: '@Model.TwoHundredDaySma.Data.ElementAt(i).Value.Sma'})
    }

console.log(twoHundredDayCandleStickChart);

    var width = 900;
    var height = 500;
    var margin = 50;

    function min(a, b) { return a < b ? a : b; }

    function max(a, b) { return a > b ? a : b; }

    //y for the candlestick
    var y = d3.scaleLinear().range([height - margin, margin]);

    var x = d3.scaleTime().range([margin, width - margin]);

    //y for the line
    var y1 = d3.scaleLinear().range([height - margin, margin]);

    //line for the sma
    var line1 = d3.line()
        .x(function (d) { return x(d["date"]); })
        .y(function (d) { return y(d["sma"]); });

    function buildChart(data) {

        data.forEach(function (d) {
            d.date = new Date(d.date);
            d.high = +d.high;
            d.low = +d.low;
            d.open = +d.open;
            d.close = +d.close;
            d.sma = +d.sma;
        });

    var chart = d3.select("#twoHundredDaySmaWithCandleStickChart")
        .append("svg")
        .attr("class", "chart")
        .attr("width", width)
        .attr("height", height);

    //map is going to create an array with all the lows and then d3.min will take the min out of all of them
    y.domain([d3.min(data.map(function (x) { return x["low"]; })), d3.max(data.map(function (x) { return x["high"]; }))])

    x.domain(d3.extent(data, function (d) { return d["date"]; }))

    y1.domain(d3.extent(68, d3.max(data, function (d) { return d["sma"]; })))


    //grid for the chart; x and y axis
    chart.selectAll("line.x")
        .data(x.ticks(10))
        .enter().append("line")
        .attr("class", "x")
        //.text(String)
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", margin)
        .attr("y2", height - margin)
        .attr("stroke", "#ccc");
    chart.selectAll("line.y")
        .data(y.ticks(10))
        .enter().append("line")
        .attr("class", "y")
        .attr("x1", margin)
        .attr("x2", width - margin)
        .attr("y1", y)
        .attr("y2", y)
        .attr("stroke", "#ccc");


    //x axis
    chart.append("g")
        .attr("transform", "translate(0," + 450 + ")") //need to change this 450 to a variable- it is how far down the axis will go
        .attr("class", "xrule")   // give it a class so it can be used to select only xaxis labels  or change color
        //the x axis                        
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function (d) {
        return "rotate(-65)"
        });

    //the y axis
    chart.selectAll("text.yrule")
        .data(y.ticks(10))
        .enter()
        .append("text")
        .attr("class", "yrule")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", 0)
        .attr("dx", 20)
        .attr("text-anchor", "middle")
        .text(String);

    //add rectangles- if open higher then close then red
    chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function (d) { return x(d["date"]); })
        .attr("y", function (d) { return y(max(d["open"], d["close"])); })
        .attr("height", function (d) { return y(min(d["open"], d["close"])) - y(max(d["open"], d["close"])); })
        .attr("width", function (d) { return 0.5 * (width - 2 * margin) / data.length; })
        .attr("fill", function (d) { return d["open"] > d["close"] ? "red" : "green"; });

    //add a stem to the rectangle
    chart.selectAll("line.stem")
        .data(data)
        .enter().append("line")
        .attr("class", "stem")
        .attr("x1", function (d) { return x(d["date"]) + 0.25 * (width - 2 * margin) / data.length; })
        .attr("x2", function (d) { return x(d["date"]) + 0.25 * (width - 2 * margin) / data.length; })
        .attr("y1", function (d) { return y(d["high"]); })
        .attr("y2", function (d) { return y(d["low"]); })
        .attr("stroke", function (d) { return d.open > d.close ? "red" : "green"; });

    chart.append("path")
        .data([data])
        .attr("d", line1)
        .attr("class", "line")
        .style("stroke", "white")
        .attr("fill", "none")
        .attr("stroke-width", 2);


}

buildChart(twoHundredDayCandleStickChart);
</script>
</body>