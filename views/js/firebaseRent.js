class Tenant{
  constructor(name, phno, email, date){
    this.name = name;
    this.phno = phno;
    this.email = email;
    this.date = date;
  }
}

function addTenant() {
  var name = document.getElementById('tName')
                      .value
  var phno =  document.getElementById('phno')
                      .value                  
  var email = document.getElementById('email')
  .value
  var date = document.getElementById('date').value

  firebase.database().ref('Tenant/' + name).set({
    Name: name,
    Phno: phno,
    Email: email,
    ArrivalDate: date
  });
  window.alert("Successfully added");
  notify();
}

function editTenant(){
  var flag = 0;
 

  firebase.database().ref('Tenant').once('value', function(snapshot) {
    snapshot.forEach(function(child) {
     var childData = child.val();
     if (document.getElementById('tName').value == String(childData['Name'])){
      document.getElementById('date').value = String(childData['ArrivalDate']);
      document.getElementById('email').value = childData['Email']
      document.getElementById('phno').value = childData['Phno'];
      flag = 0;
     }
     else{
       flag = 1;
     }
    });

  });
  if(flag == 1){
    window.alert("Not Present");
    console.log('not found');
  }
  
}

function deleteTenant(){

  var name = document.getElementById('tName').value;
  return firebase.database().ref().child('/Tenant/' + name).remove();

}

function updateTenant(){
  var updates = {};
  var name = document.getElementById('tName').value;
  var date = document.getElementById('date').value;
  var email = document.getElementById('email').value; 
  var phno = document.getElementById('phno').value; 
  var postData = {
    Name:name,
    ArrivalDate:date,
    Email:email,
    Phno:phno
  };
  updates['/Tenant/' + name] = postData;
  window.alert("Successfully Updated");

  return firebase.database().ref().update(updates);
}
function addFlat() {
  var flatno = document.getElementById('flatno')
                      .value
  var floorno =  document.getElementById('floorno')
                      .value                  
  var tname = document.getElementById('tname')
  .value


  firebase.database().ref('Flats/' + floorno + '/' +flatno).set({
    floorno:floorno,
    flatno: flatno,
    tname: tname
  });
  window.alert("Successfully added");

}

function getTenant(){
  var output = " ";
  document.body.style.backgroundRepeat = "no-repeat";
  document.write("<body background=\"back.jpg\"; background-repeat :\"no-repeat\";>");
  document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css\/Form.css\">");
  output.concat( "<table border =\"2\" cellpadding=\"25\">");
  output.concat( "<th> Name </th> <th> ArrivalDate </th> <th> Email </th><th> Phno </th><th>Floorno</th> ");
  document.write("<span style=\"color:blue;font-size: 1em; font-family:arial, helvetica, sans-serif;\">");
  document.writeln("<table cellpadding=\"25\">");
  document.writeln("<th> Name </th> <th> ArrivalDate </th> <th> Email </th><th> Phno </th>");
  firebase.database().ref('Tenant').once('value', function(snapshot) {
    snapshot.forEach(function(child) {
     document.writeln("<tr>")
    
     var childData = child.val();
     console.log(childData);
   
     document.writeln("<td>" +childData['Name'] + "</td>");
     document.writeln("<td>" +childData['ArrivalDate'] + "</td>");
     document.writeln("<td>" +childData['Email'] + "</td>");
     document.write("<td>" +childData['Phno'] + "</td>");
     document.writeln("</tr>");  

   
});
});
}
function notify(){
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; 
  var yyyy = today.getFullYear();

  if(dd<10) dd = '0' + dd;
  if(mm<10) mm = '0' + mm;
  var compdate = mm + '/'+ dd + '/' +yyyy;
  document.writeln(mm + '/'+ dd + '/' +yyyy);
  const date1 = new Date(compdate);
  

  
  firebase.database().ref('Tenant').once('value', function(snapshot) {
    snapshot.forEach(function(child) {
     var childData = child.val();
     const date2 = new Date(childData['ArrivalDate']);
     const diffTime = Math.abs(date2.getTime() - date1.getTime());
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
     console.log(diffDays);


     
    //  document.writeln("<td>" +childData['Name'] + "</td>");
    //  document.writeln("<td>" +childData['ArrivalDate'] + "</td>");
    //  document.writeln("<td>" +childData['Email'] + "</td>");
    //  document.write("<td>" +childData['Phno'] + "</td>");
    //  document.writeln("</tr>");  
});
});




}

function getCurrDate(){
  notify();
//   today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth() + 1; 
// var yyyy = today.getFullYear();

// if(dd<10) dd = '0' + dd;
// if(mm<10) mm = '0' + mm;
// var compdate = mm + '/'+ dd + '/' +yyyy;
// document.writeln(mm + '/'+ dd + '/' +yyyy);
// const date1 = new Date(compdate);
// const date2 = new Date('8/1/2019');

// const diffTime = Math.abs(date2.getTime() - date1.getTime());
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log(diffDays);
// return (mm + '/'+ dd + '/' +yyyy);
}

function back(){
  location.replace('homeScreen');
}