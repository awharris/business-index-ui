function match_business() {
  var string = "http://localhost:9000/v1/search?query=UPRN:\"";
  var string2 = document.getElementById('ubrnentry').value.toString();
  var string3 = string.concat(string2);
  var stringEnd = "\""
  var query = string3.concat(stringEnd);

  console.log(query)
  send_request(query)
}

function send_request(query){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", query, false ); // false for synchronous request
  xmlHttp.send( null );
  console.log("start")
  console.log(xmlHttp.responseText)
  console.log("end")

  // ALL of below should be in a seperate function
  var jsonResponse = JSON.parse(xmlHttp.responseText);

  var arr = [];
  for(var x in jsonResponse){
    arr.push(jsonResponse[x]);
  }

  // var to_add = ""
  // for (i = 0; i < arr.length; i++) {
  //   business_div = "<div>" +
  // 				 "<h3>" + arr[i].businessName + "</h3>" +
  // 				 "<p>" + "UPRN: " + arr[i].uprn + "</p>" +
  // 				 "<p>&pound;" + "Industry Code: " + arr[i].industryCode +"</p>" +
  // 				 "<br>" +
  // 				 "</div>";
  //   to_add += business_div
  // }
  // document.getElementById('prod').innerHTML =  to_add;


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
  document.getElementById('prod').innerHTML =  new_div;
}

function backup_working_request() {
  var xmlHttp = new XMLHttpRequest();
  //var string = "http://localhost:9000/v1/search?query=BusinessName=" + document.getElementById('businessName').value
  //console.log(string)
  xmlHttp.open( "GET", "http://localhost:9000/v1/search?query=BusinessName=test", false ); // false for synchronous request
  xmlHttp.send( null );
  console.log("start")
  console.log(xmlHttp.responseText)
  console.log("end")
}