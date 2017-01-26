function results_format(jsonResponse,xml,search_query){
  var table_checked = document.getElementById("radio1").checked;
  var list_checked = document.getElementById("radio2").checked;
  var json_checked = document.getElementById("radio3").checked;

  if (table_checked){
    var arr = [];
    for(var x in jsonResponse){
      arr.push(jsonResponse[x]);
    }

    // Need to show table div
    var start = "<div class='table-responsive'><table class='table table-striped'><thead><tr>";

    var headers = "<th>ID</th>\
            <th>Business Name</th>\
            <th>UPRN</th>\
            <th>Industry Code</th>\
            <th>Legal Status</th>\
            <th>Trading Status</th>\
            <th>Turnover</th>\
            <th>Employment Bands</th>\
          </tr>\
        </thead>\
        <tbody>";

    var end = "</tbody></table></div>";

    var to_add = ""
    for (i = 0; i < arr.length; i++) {
      business_div = "<tr>" +
             "<td>" + arr[i].id + "</td>" +
             "<td>" + arr[i].businessName + "</td>" +
             "<td>" + arr[i].uprn + "</td>" +
             "<td>" + arr[i].industryCode + "</td>" +
             "<td>" + arr[i].legalStatus + "</td>" +
             "<td>" + arr[i].tradingStatus + "</td>" +
             "<td>" + arr[i].turnover + "</td>" +
             "<td>" + arr[i].employmentBands + "</td>" +
             "</tr>";
      to_add += business_div
    }
    var new_div = start + headers + to_add + end;
  }

  if (list_checked){
    var arr = [];
    for(var x in jsonResponse){
      arr.push(jsonResponse[x]);
    }
    var to_add = ""
    for (i = 0; i < arr.length; i++) {
      business_div = "<div>" +
    				 "<h3>" + arr[i].businessName + "</h3>" +
    				 "<p>" + "ID: " + arr[i].id + "</p>" +
    				 "<p>" + "UPRN: " + arr[i].industryCode +"</p>" +
             "<p>" + "Legal Status: " + arr[i].legalStatus +"</p>" +
             "<p>" + "Trading Status: " + arr[i].tradingStatus +"</p>" +
             "<p>" + "Turnover: " + arr[i].turnover +"</p>" +
             "<p>" + "Employment Bands: " + arr[i].employmentBands +"</p>" +
    				 "<br>" +
    				 "</div>";
      to_add += business_div
    }
    var new_div = to_add
  }

  if (json_checked){
    // http://jsfiddle.net/f24UP/2/
    // source: http://stackoverflow.com/questions/14195530/how-to-display-raw-json-data-on-a-html-page

    var jsonVar = {
       jsonResponse
    },
    jsonStr = JSON.stringify(jsonVar),
    regeStr = '',
    f = {
            brace: 0
        }; // for tracking matches, in particular the curly braces

    document.getElementById('prod').innerHTML = jsonStr;

    regeStr = jsonStr.replace(/({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g, function (m, p1) {
        var rtnFn = function() {
                return '<div style="text-indent: ' + (f['brace'] * 20) + 'px;">' + p1 + '</div>';
            },
            rtnStr = 0;
        if (p1.lastIndexOf('{') === (p1.length - 1)) {
            rtnStr = rtnFn();
            f['brace'] += 1;
        } else if (p1.indexOf('}') === 0) {
            f['brace'] -= 1;
            rtnStr = rtnFn();
        } else {
            rtnStr = rtnFn();
        }
        return rtnStr;
    });
    new_div = regeStr;

  }
  // Replace the divs with the query results and the actual query
  document.getElementById('prod').innerHTML =  new_div;
  document.getElementById('query').innerHTML = search_query;
}

function syntaxHighlight(json) {
  // http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function range_query(){
  var business_name = document.getElementById('BusinessName').value.toString();
  var industry_code = document.getElementById('IndustryCode').value.toString();
  var industry_code2 = document.getElementById('IndustryCode2').value.toString();
  var employment_band = document.getElementById('employmentband').value.toString();
  var legal_status = document.getElementById('legalStatus').value.toString();
  var legal_status2 = document.getElementById('legalStatus2').value.toString();
  var turnover = document.getElementById('turnover').value.toString();
  var trading_status = document.getElementById('tradingstatus').value.toString();
  var arr = [];
  var values = [["EmploymentBands:",employment_band],["LegalStatus:",legal_status],["Turnover:",turnover],["TradingStatus:",trading_status],["BusinessName:",business_name],["IndustryCode:",industry_code]];
    for(var x in values){
    if (values[x][1] != "" | " TO ]"){
      if (values[x][0] == "LegalStatus:"){
        values[x][1] = "["+legal_status+" TO "+legal_status2+"]";
      }
      if (values[x][0] == "IndustryCode:"){
        values[x][1] = "["+industry_code+" TO "+industry_code2+"]";
      }
      arr.push(values[x][0]);
      arr.push(values[x][1]);
      arr.push(" AND ");
    }
  }
  arr.pop();

  var query = arr.join("");
  console.log("Query: ",query)
  send_request(query)
}

function ubrn_lookup(){
  var search_string = "UPRN:"
  var ubrn = document.getElementById('ubrnentry').value.toString();
  var query = search_string.concat(ubrn)
  send_request(query)
}

function send_request(query){
  var xmlHttp = new XMLHttpRequest();
  var search = "http://localhost:9000/v1/search?query=";
  var search_query = search.concat(query)
  xmlHttp.open( "GET", search_query, false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(search.concat(query))

  var xml = xmlHttp.responseText;

  // ALL of below should be in a seperate function
  var jsonResponse = JSON.parse(xmlHttp.responseText);

  results_format(jsonResponse,xml,search_query)

  // Below is for finding out the size of a response:
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET','http://localhost:9000/v1/search?query=UPRN:734090080368',true);
  //
  // //xhr.open('GET','https://www.google.com/images/errors/robot.png',true);
  //
  // xhr.overrideMimeType('text/plain; charset=x-user-defined');
  // xhr.onreadystatechange=function(e){
  //     if(xhr.readyState==4&&xhr.status==200){
  //         console.log(xhr.response.length);
  //     }
  // };
  // xhr.send();
}
