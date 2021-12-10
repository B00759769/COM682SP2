//The URIs of the REST endpoint
IUPS = "https://prod-156.westeurope.logic.azure.com:443/workflows/b35885ecadee46dfb31757898340fb04/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ytoi0PSjdGL8FbfJCw7Tcm2DPafDB__4cu96b8vu2bo";
RAI = "https://prod-150.westeurope.logic.azure.com:443/workflows/14ae8cb63fb94603be0f4a49954064a2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=n--nasMiZQyLjwPzvYPB9TtNa8e9gu-klyzgWNCTEAc";

CIV = "https://prod-145.westeurope.logic.azure.com:443/workflows/1cacdeddaefd43a9bb0775ecb6f4aaa8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=D43t8FDgMwy4_33pkuYsUASsFasr_haS8fCsOyeUrP4"
RAV = "https://prod-236.westeurope.logic.azure.com:443/workflows/091c67d35eaa4c5d97621949e6180bc2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6muwvoQgCWOAlvjFkWsZzVabNbl4rdol9QpqIjq_Y9A"

DIM1 = "https://prod-229.westeurope.logic.azure.com:443/workflows/a8fca5dd70124a52a5574d4c8d407422/triggers/manual/paths/invoke/"
DIM2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZBXp0gVPD9Bd7EfYo3lHx5F-EsTg0LiRlTBUZPWnnVE"

EIM1 = "https://prod-246.westeurope.logic.azure.com/workflows/b1d86b4e4af54118850b83f55e0c74c3/triggers/manual/paths/invoke/"
EIM2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Xq5ek9ZCn5nhBks00zSI9Kr4ZKco9n3udk5Qb_b8dio"

CIU = "https://prod-231.westeurope.logic.azure.com:443/workflows/fab943511def4d81aceff6bb03baded7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2lFyNyYG6w6KFq6bOL80mMGAUT6CRbiuc2aHHKRJ6j4"
UFL = "https://prod-51.westeurope.logic.azure.com:443/workflows/d204f3dd49d34cb9bc0982f40361bdd2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aFTE-mcbgn3MNp09ivps_2G2SZZ_77C6vStxESYLeXA"
GAU = "https://prod-38.westeurope.logic.azure.com:443/workflows/afea82aac0ec4aa3a8bb819c7ff4f4ca/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sibJLs5qPrVXtTM0PZfpMtdAxa_oQBUrmoEM_9dRLUs"

BLOB_ACCOUNT = "https://imageb00759769.blob.core.windows.net";
UserID = 0;
Username = "";

//Handlers for button clicks
$(document).ready(function() {

  getImages();

  $("#formImageButton").click(function(){
    
    toggleImageForm();

  });

  $("#formLoginButton").click(function(){
    Login();
  });

  $("#logout").click(function(){
    Logout();
  })
  $("#register").click(function(){
    registerUser();
  });

   //Handler for the new asset submission button
  $("#subNewFormImages").click(function(){

    //Execute the submit new asset function
    submitNewAssetImages();
    
  });

});

function Login(){
  $.getJSON(GAU, function(user){
    loggedIn=false;

    $.each(user, function(key, val){
      username = $("#username").val();
      password = $("#userPassword").val();
      if (val["username"] == username && val["userPassword"] == password){
        loggedIn = true;
        UserID = val["userID"];
        Username = val["username"];
        // alert(username)
        // alert(password)
        $("#loginForm").toggle();
        $("#logout").toggle();
      }
    });
    if(loggedIn != true){
      alert("Username or Password Incorrect!")
    }
  });
}

function registerUser(){
  submitData = new FormData();

  submitData.append('username',$('#username').val());
  submitData.append('userPassword',$('#userPassword').val());


  //post form data to endpoint
  $.ajax({
    url: CIU,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
   
    }
  })
}


function Logout(){
  UserID = 0;
  Username = "",
  $("#loginForm").toggle();
  $("#newAssetForm").toggle();
  $("#logout").toggle();
}



//A function to submit a new asset to the REST endpoint 
function submitNewAssetImages(){
    //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('userID', UserID);
 submitData.append('userName', Username);
 submitData.append('File', $("#UpFile")[0].files[0]);
 submitData.append('type', $("#UpFile")[0].files.item(0).type);
 

  //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

 }
 });
 getImages();


}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  //Replace the current HTML in that div with a loading message
   $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
   $.getJSON(RAI, function( data ) {
   //Create an array to hold all the retrieved assets
   var items = [];
  
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
   $.each( data, function( key, val ) {
    items.push( "<hr />");
    items.push("<h1>" +val["type"] + "</h1>");
    if (val["type"] == 'video/mp4')
    {
    items.push("<video controls width='400' height='320'><source src='"+BLOB_ACCOUNT + val["filePath"] +"'/></video><br />");
    }
    else if (val["type"] == 'audio/mpeg')
    {
    items.push("<audio controls> <source src='"+BLOB_ACCOUNT + val["filePath"] +"' type='audio/mpeg'> </audio>")
    }
    else {
    items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />");
    }
    items.push( "File : " + val["fileName"] + "<br />");
    items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
    items.push('<button type=button onclick="deleteMedia(\''+val["id"]+'\') "class="btn btn-danger">Delete Media</button><br/>');
    
    items.push('<div class="mb-3"> <label for="editFileName" class="form-label">File Name</label><input type="text" class="form-control" id="editFileName"></div>')
    // items.push('<div class="mb-3"><label for="edituserID" class="form-label">User Id</label><input type="string" class="form-control" id="edituserID"></div>')
    // items.push('<div class="mb-3"><label for="edituserName" class="form-label">User Name</label><input type="text" class="form-control" id="edituserName"></div>')
    items.push('<div class="mb-3"><label for="editUpFile" class="form-label">File to Upload</label><input type="file" class="form-control" id="editUpFile"></div>')
    items.push('<button type=button onclick="editMedia(\''+val["id"]+'\') "class="btn btn-secondary">Update</button><br/>');
    items.push( "<hr />");
    });
    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
    }).appendTo( "#ImageList" );
    });
  }

// delete function which uses specific asset ID
function deleteMedia(id){
  $.ajax({
    type: "DELETE",
    url :   DIM1 + id + DIM2
  })
  alert("Media Deleted")
  getImages(); 
}

function editMedia(id){
  submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#editFileName').val());
 submitData.append('userID', UserID);
 submitData.append('userName', Username);
 submitData.append('File', $("#editUpFile")[0].files[0]);
 submitData.append('type', $("#editUpFile")[0].files.item(0).type);

  $.ajax({
    type: "PUT",
    url : EIM1 + id + EIM2,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,

    success: function(data){
      
    }
    });
    getImages();
    }


function toggleImageForm(){
  $("#imageForm").toggle();
}

