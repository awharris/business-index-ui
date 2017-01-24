// function match_business() {
//   var string = "http://localhost:9000/v1/search?query=UPRN:\"";
//   var string2 = document.getElementById('ubrnentry').value.toString();
//   var string3 = string.concat(string2);
//   var stringEnd = "\""
//   var query = string3.concat(stringEnd);
//   console.log(query)
//   send_request(query)
// }

function range_query(){
  var business_name = document.getElementById('BusinessName').value.toString();
  var industry_code = document.getElementById('IndustryCode').value.toString();
  var employment_band = document.getElementById('employmentband').value.toString();
  var legal_status = document.getElementById('legalStatus').value.toString();
  var turnover = document.getElementById('turnover').value.toString();
  var trading_status = document.getElementById('tradingstatus').value.toString();
  var arr = [];
  var values = [["EmploymentBands:",employment_band],["LegalStatus:",legal_status],["Turnover:",turnover],["TradingStatus:",trading_status],["BusinessName:",business_name],["IndustryCode:",industry_code]];
  for(var x in values){
    if (values[x][1] != ""){
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
  xmlHttp.open( "GET", search.concat(query), false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(search.concat(query))
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
