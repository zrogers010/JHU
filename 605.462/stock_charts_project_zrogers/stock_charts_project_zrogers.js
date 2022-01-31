var app = angular.module('angular_d3_stock_charts', ['ui.bootstrap']);

app.controller('DataController', ['$scope', 'dataFactory', function ($scope, dataFactory) {
    var self = this;
    $scope.data.time = "180";

    self.submit = function () {
        if (self.stock.symbol) {
            console.log("submit");
            $scope.symbol = self.stock.symbol;
            console.log($scope.symbol);
            $scope.time = self.time;
            console.log($scope.time);

            var promise = dataFactory.getData($scope.symbol, $scope.time);
            promise.then(function (data) {
                //console.log(data);
                $scope.items = data.reverse();
                console.log($scope.items);
            });
        }
    }
    return $scope.items;

}]);


app.controller('DrawController', ['$scope', function ($scope) {
    var self = this;
    console.log("DrawController");

    // Sketch
    self.sketch = function () {
        console.log("sketch");
        d3.select('.chart').call(drawPath());
    };
    // Clear annotations
    self.clear = function () {
        console.log("clear");
        //console.log(trend_nodes);
        //console.log(trend_edges);
        d3.selectAll('.sketch').remove();

    }

}]);


app.factory('dataFactory', function ($q, $http) {
    console.log("Factory!");
    var factory = {};
    factory.getData = function (symbol, time) {
        console.log("getData()");
        console.log(symbol);
        console.log(time);
        var deferred = $q.defer();
        //var symbol = s;

        var start = "2015-01-06";

        var dateFormat = d3.time.format("%Y-%m-%d");
        var end = new Date();
        var start2 = new Date(end.getTime() - 1000 * 60 * 60 * 24 * time);

        /* Yahoo Finance API not working anymore. */

        // console.log(start2);
        // var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
        // var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + dateFormat(start2) + '" and endDate = "' + dateFormat(end) + '"';
        // var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;
        // console.log(url);
        // $http.jsonp(url).success(function (json) {
        //     console.log(json);
        //     var quotes = json.query.results.quote;
        //     deferred.resolve(quotes);
        //     console.log(quotes);
        // });
        // return deferred.promise;

        /* Reading in data from .json file. */
        $http.get("fb_3m_sorted_json.json").success(function (json) {
            console.log(json);

            deferred.resolve(json);
        });
        return deferred.promise;

    }
    return factory;
});


// Directive
app.directive('chart', function () {
    console.log("chart directive");
    return {
        restrict: "EA",
        //template: "<svg width='90%' height='50%' class='chart_svg'></svg>",
        link: function (scope, element, attrs) {
            console.log("link");
            scope.$watch(function (scope) {
                    return scope.items
                },
                function (newValue, oldValue) {
                    console.log("$WATCH");
                    //console.log(scope.items);
                    var sdata = scope.items;
                    if (scope.items != null) {
                        console.log(" **** ");
                        buildChart(sdata);
                    }

                }, true);
        }
    }
});

// D3 code to build the visualization from data passed from my angular factory.
function buildChart(data) {
    console.log("buildChart()");
    var nodes = [];
    var edges = [];

    margin = {top: 20, right: 30, bottom: 30, left: 35};
    var body = parseInt(d3.select('body').style('height'), 10);
    var top = parseInt(d3.select('#top').style('height'), 10);
    var footer = parseInt(d3.select('.footer').style('height'), 10);
    height = (body - top - footer) - margin.top - margin.bottom;
    width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d").parse;
    var formatTime = d3.time.format("%e %B");
    var dateFormat = d3.time.format("%Y-%m-%d");

    function min(a, b) {
        return a < b ? a : b;
    }

    function max(a, b) {
        return a > b ? a : b;
    }

    // Axis fitting and margins
    xScale = d3.scale.ordinal().rangePoints([margin.left / 4, width - margin.right / 2]);
    yScale = d3.scale.linear().range([height, 0]);
    var yVolScale = d3.scale.linear().range([height, 2 * height / 3]);
    var numberFormatter = d3.format("s");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function (d) {
            return numberFormatter(d);
        })
        .orient("right");

    var yVolAxis = d3.svg.axis()
        .scale(yVolScale)
        .tickFormat(function (d) {
            return numberFormatter(d);
        })
        .orient("left");


    d3.select('.chart').remove();
    var chart = d3.select('chart').append('svg')
        .attr("class", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //.on("mousedown",drawTrend());


    //var chart = d3.select('.chart_svg').append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function (d) {
        d.date = parseDate(d.Date);
        d.open = +d.Open;
        d.high = +d.High;
        d.low = +d.Low;
        d.close = +d.Close;
        d.volume = +d.Volume;

        size = d.close;
    });

    //console.log(data);
    //var n = Math.floor(size / 10);
    var n = 1
    var barWidth = (width - 2 * margin.right) / data.length;

    xDomain = data.map(function (d) {
        return d.date;
    });
    yDomain = [n * Math.floor(d3.min(data, function (d) {
        return d.low;
    }) / n),
        n * Math.ceil(d3.max(data, function (d) {
            return d.high;
        }) / n)];

    xScale.domain(xDomain);
    yScale.domain(yDomain);
    yVolScale.domain([0, d3.max(data, function (d) {
        return d.volume;
    })]);
    console.log("$$$");
    //var i = 0;
    //console.log(data[0].date.getMonth());
    var i = data[0].date.getMonth();
    var yesterday = data[0].date.getDate();
    var xAxis = d3.svg.axis()
        .scale(xScale)
        //.selectAll("text")
        //.attr("transform", "rotate(90)")
        .orient("bottom")
        //.tickFormat(d3.time.format("%b, %e '%y"))
        .tickFormat(d3.time.format("%b, %e"))
        // Set X Axis Ticks
        .tickValues(xScale.domain().filter(function (d) {

            // GOOD:
            today = d.getDate();
            console.log("today: ", today);
            console.log(" --- ");
            if (yesterday > today) {
                console.log("TRUE");
                yesterday = today;
                return (d.getDate());
            }
            yesterday = today;
            console.log("yesterday: ", yesterday);
            // END GOOD


        }));

    chart.selectAll("line.x")
        .data(xAxis.tickValues())
        .enter().append("svg:line")
        .attr("class", "x")
        .attr("x1", xScale)
        .attr("x2", xScale)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#E6E6E6");

    chart.selectAll("line.y")
        .data(yScale.ticks(10))
        .enter().append("svg:line")
        .attr("class", "y")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale)
        .attr("y2", yScale)
        .attr("stroke", "#E6E6E6");

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("y", 15)
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "translate(0)")
        .attr("transform", "rotate(0)");

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
    //.text("Value ($)");

    // Vol Axis
    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0)")
        .call(yVolAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 2)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
    //.text("Shares Traded");

    // Volume bars
    chart.append("g").selectAll("rect")
        .data(data)
        .enter().append("svg:rect")
        .attr("x", function (d) {
            return xScale(d.date) - barWidth / 2;
        })
        .attr("width", barWidth)
        .attr("y", function (d) {
            return yVolScale(d.volume);
        })
        .attr("height", function (d) {
            return (height - (yVolScale(d.volume)));
        })
        .style("fill", function (d) {
            return d.close >= d.open ? "#B2D1B2" : "#FFB2B2";
        })
        .style("opacity", 0.8);

    chart.append("g").selectAll("line.stem")
        .data(data)
        .enter().append("svg:line")
        .attr("class", "stem")
        .attr("x1", function (d) {
            return xScale(d.date);
        })
        .attr("x2", function (d) {
            return xScale(d.date);
        })
        .attr("y1", function (d) {
            return yScale(d.high);
        })
        .attr("y2", function (d) {
            return yScale(d.low);
        })
        .attr("stroke", function (d, i) {
            if (i > 0) {
                if (d.close < data[i - 1].close) {
                    return d.close >= d.open ? "green" : "red";
                }
                else return d.close >= d.open ? "green" : "red";
            }
            else return d.close >= d.open ? "green" : "red";
        })
        .attr("stroke-width", 0.8);

    chart.append("g").selectAll("rect")
        .data(data)
        .enter().append("svg:rect")
        .attr("x", function (d) {
            return xScale(d.date) - barWidth / 4;
        })
        .attr("y", function (d) {
            return yScale(max(d.open, d.close));
        })
        .attr("height", function (d) {
            return d.open == d.close ? 1 : yScale(min(d.open, d.close)) - yScale(max(d.open, d.close));
        })
        .attr("width", function (d) {
            return 0.5 * barWidth;
        })
        .attr("fill", function (d, i) {
            if (i > 0) {
                // if todays close is below yesterdays then filled
                if (d.close < data[i - 1].close) {
                    return d.close >= d.open ? "green" : "red";
                }
                else return "white"
            }
            else return d.close >= d.open ? "green" : "red";

        })
        .attr("stroke", function (d, i) {
            if (i > 0) {
                if (d.close < data[i - 1].close) {
                    return d.close >= d.open ? "green" : "red";
                }
                else return d.close >= d.open ? "green" : "red";
            }
            else return d.close >= d.open ? "green" : "red";
        })
        .attr("stroke-width", 0.8);

    //drawTrend();



    crossHairs(data);

}



/* ========== ========== */

// Free draw line SKETCH
function drawPath() {
    //"use strict";
    console.log("drawpath!");
    var ptdata = [];
    objCount = 0;


    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d, i) {
            return d[0];
        })
        .y(function (d, i) {
            return d[1];
        });

    var chart = d3.select(".chart")
        .on("mousedown", function() {
            //if (dp_clicked) {
            mousedown();
            //}
        })
        .on("mouseup", function() {
            //if (dp_clicked) {
            mouseup();
            //}
        });
    //.append("g");

    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    function mousedown() {
        objCount += 1;
        console.log("mousedown");
        path = chart.append("g")
            .attr("class", "sketch")
            .attr("id", "objCount_" + objCount)
            .append("path")
            .data([ptdata])
            .attr("class", "draw-path")
            .attr("d", line);
        //var pt = d3.mouse(this);

        chart.on("mousemove", mousemove);
    }

    function mousemove() {
        console.log("mousemove");
        var pt = d3.mouse(this);
        ptdata.push(pt);
        console.log(ptdata);

        // Redraw the path:
        path.attr("d", function (d) {
            return line(d);
        })
    }

    function mouseup() {
        console.log("mouseup");
        ptdata = [];
        chart.on("mousemove", null);
    }

}



// Crosshairs
function crossHairs(data) {
    console.log("CROSS HAIRS");

    d3.select("svg.chart").append('rect').transition().duration(500)
        .attr('width', 70)
        .attr('height', 120)
        .attr('x', 5)
        .attr('y', margin.top)
        .style('fill', 'none')
        .attr('stroke', 'black');

    // Add candle price details to box
    var candleDetails = d3.select("svg.chart").append('foreignObject')
        .attr('x', 5)
        .attr('y', margin.top + 5)
        .attr('width', 70)
        .attr('height', 110)
        .append("xhtml:body")
        .html('<div style="font-size: 10px; width: 70px;">' +
            '<p><span class="tb-text">High: </span><span class="tb-val">' + data[data.length-1].High + '</span></p>' +
            '<p><span class="tb-text">Low: </span><span class="tb-val">' + data[data.length-1].Low + '</span></p>' +
            '<p><span class="tb-text">Open: </span><span class="tb-val">' + data[data.length-1].Open + '</span></p>' +
            '<p><span class="tb-text">Close: </span><span class="tb-val">' + data[data.length-1].Close + '</span></p>' +
            '<p><span class="tb-text">Vol: </span><span class="tb-val">' + Math.round(data[data.length-1].Volume/100000)/10 + 'M</span></p></div>');

    /*
        var lineDetails = d3.select("svg.chart").append("foreignObject")
            .attr('x', width-10)
            .attr('y', data[data.length-1].Close)
            .attr('width', 20)
            .attr('height', 20)
            .append("xhtml:body")
            .html('<div class="focus-price">' +
            '<p><span>PRICE</span></p>' +
            '</div>');
    */
    // Focus
    var focus = d3.select(".chart").append("g").style("display", "none");

    focus.append("line")
        .attr("id", "focusLineX")
        .attr("class", "focusLine");
    focus.append("line")
        .attr("id", "focusLineY")
        .attr("class", "focusLine");
    focus.append("circle")
        .attr("id", "focusCircle")
        .attr("r", 5)
        .attr("class", "circle focusCircle");
    //
    focus.append("foreignObject")
        .attr("id", "lineDetailY")
        .attr("class", "lineDetail");


    d3.select(".chart").append('rect')
        .attr('class', 'overlay')
        .attr("stroke", 1)
        .attr("x1", margin.left)
        .attr("y1", margin.top)
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .on('mouseover', function () {
            focus.style('display', null);
        })
        .on('mouseout', function () {
            focus.style('display', 'none');
        })
        .on('mousemove', function (d) {

            var xMouse = d3.mouse(this)[0];

            var leftEdges = xScale.range();
            var rangewidth = xScale.rangeBand();
            console.log("Width: " + rangewidth);
            var j;

            for (j = 0; xMouse > (leftEdges[j] + rangewidth); j++) {
            }
            // Get data at this point
            console.log(data[j]);

            mouseDate = data[j].Date;

            var d0 = data[j - 1].Date;
            console.log("d0: " + d0);
            var d1 = data[j].Date;
            console.log("d1: " + d1);

            var x = xScale(xDomain[j]);
            //var y = yScale(d[1]);
            var y = yScale(data[j].Close);


            focus.select('#focusCircle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 2)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            focus.select('#focusLineX')
                .attr('x1', x).attr('y1', yScale(yDomain[0]))
                .attr('x2', x).attr('y2', yScale(yDomain[1]))
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            focus.select('#focusLineY')
                .attr('x1', 0).attr('y1', y)
                .attr('x2', width).attr('y2', y)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Chart details box
            candleDetails.html('<div style="font-size: 10px; width: 70px;">' +
                '<p><span class="tb-text">High: </span><span class="tb-val">' + data[j].High + '</span></p>' +
                '<p><span class="tb-text">Low: </span><span class="tb-val">' + data[j].Low + '</span></p>' +
                '<p><span class="tb-text">Open: </span><span class="tb-val">' + data[j].Open + '</span></p>' +
                '<p><span class="tb-text">Close: </span><span class="tb-val">' + data[j].Close + '</span></p>' +
                '<p><span class="tb-text">Vol: </span><span class="tb-val">' + Math.round(data[j].Volume/100000)/10 + 'M</span></p></div>')

            //
            focus.select('lineDetailY')
                .attr('x', 100)
                .attr('y', y)
                .attr('width', 20)
                .attr('height', 20)
                .append("xhtml:body")
                .html('<div class="focus-price">' +
                    '<p><span>PRICE</span></p>' +
                    '</div>');
        });
}
