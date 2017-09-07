$(document).ready(function () {

    $('#retrieve-resources').click(function () {
        var displayResources = $('#display-resources');

        displayResources.text('Loading data from JSON source...');

        $.ajax({
            type: "GET",
            url: "https://www.mapquestapi.com/traffic/v2/incidents?&outFormat=json&boundingBox=42.43004544849287%2C-70.89271545410156%2C42.28746890196628%2C-71.22058868408203&key=OxwSeR25jwmKHCvAwDa9GTZIvc1A835n",
            success: function(result)
            {
                console.log(result);
                var output="<table><thead><tr><th>Severity</th><th>Roads and Lanes closed info</th><th>Impacting</th></thead><tbody>";
                for (var i in result)
                {
                    output+="<tr><td>" + result[i].severity + "</td><td>" + result[i].fullDesc + "</td><td>" + result[i].impacting + "</td></tr>";
                }
                output+="</tbody></table>"

                displayResources.html(output);
                $("table").addClass("table");
            }
        });

    });
});