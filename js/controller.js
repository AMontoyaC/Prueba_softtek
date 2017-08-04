$(document).ready(function(){
	getBlogposts();
  	getUsers();
	var total_users;
	var total_blogposts;

	$("#map").hide();
	$("#company").hide();

	//variables geo location
	var lat,lng;

	//company variables
	var company_name;
	var company_catchPhrase;
	var company_bs;

	//retrieve variable from localStorage
	var id_user = localStorage.getItem("id_usuario");
	getUser(id_user);
});


//functions for blogposts
function getBlogposts(){
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
      console.log(response);
      total_blogposts = response.data.length; //var with the total number of items
      
      //loop to iterate trought response
      for(var i=0; i < total_blogposts; i++){
      	//append in the div "panel_item", call function "item" and send all the info of each item
      	$("#panel_item").append(item(response.data[i].userId,response.data[i].id,response.data[i].title,response.data[i].body));
      }
  	})

    //catch in case of error when obtaining the response of the endpoint
    .catch(function (error) {
      console.log(error);
    });
}


//function item, in which creates the code for every item
function item(userId,id,title,body){
	return "<div class='user_"+userId+"'><div class='title_item'>"+title+"</div><br><div class='body_item'>"+body+"</div></div>";
}

//functions for users_list
function getUsers(){
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
      console.log(response);
      total_users = response.data.length; //var with the total number of users
      
      //loop to iterate trought response
      for(var i=0; i < total_users; i++){
      	//append in the div "panel_item", call function "item" and send all the info of each item
      	$("#panel_users").append(users(response.data[i].id,response.data[i].name,response.data[i].username,response.data[i].email));
      }
  	})

    //catch in case of error when obtaining the response of the endpoint
    .catch(function (error) {
      console.log(error);
    });
}


//function users, in which creates the code for every user
function users(id,name,username,email){
  //obtain initials of name. Ex. Andrea Montoya - Initials: AM
  var initial_name = name.slice(' ').charAt(0);
  var initial_lastname = name.split(' ').pop().charAt(0);

  //random number to select a color from the array "array_colors" and set the background of the "image_user"
  var array_colors = ["#D50158","#8900A6","#3330A3","#0071D7","#0084D6","#009BAA","#009534","#FFC100","#FF7101","#F92801"];
  var color = array_colors[Math.floor(Math.random() * (9 - 0 + 0)) + 0];
	return "<div class='row_user' align='center'><div class='col-xs-12'><div class='col-xs-2'><div class='image_user' style='background-color:"+color+"'>"+initial_name+initial_lastname+"</div></div><div class='col-xs-2'><div class='name_user'>"+name+"</div></div><div class='col-xs-2'><div class='username_user'>"+username+"</div></div><div class='col-xs-4'><div class='email_user'>"+email+"</div></div><div class='col-xs-2'><img src='../img/img_plus.png' id='moreinfo_user_"+id+"' height='20px' width='20px' onclick='click_moreinfo("+id+")'/></div></div></div>";
}

//function to start more info of the user selected
function click_moreinfo(id){
	//set localstorage variable
  	localStorage.setItem("id_usuario", id);
  	window.location.href = "user.html";
}

//functions for user
function getUser(id_usuario){
	console.log('https://jsonplaceholder.typicode.com/users/'+id_usuario);
  axios.get('https://jsonplaceholder.typicode.com/users/'+id_usuario)
    .then(function (response) {
      console.log(response);
      //put data in their respectives divs
      $("#name").text(response.data.name);
      $("#txt_username").text(response.data.username);
      $("#txt_email").text(response.data.email);
      $("#txt_address").html('<a href="#" onclick="show_address()">'+response.data.address.street + " "+ response.data.address.suite + " " + response.data.address.zipcode+'</a>');
      $("#txt_city").text(response.data.address.city);
      $("#txt_phone").text(response.data.phone);
      $("#txt_website").text(response.data.website);
      $("#txt_company").html('<a href="#" onclick="show_company()">'+response.data.company.name+'</a>');

      //initial letters
      var initial_name = response.data.name.slice(' ').charAt(0);
      var initial_lastname = response.data.name.split(' ').pop().charAt(0);
      
      //obtain random number to get one color of the array "array_colors"
      var array_colors = ["#D50158","#8900A6","#3330A3","#0071D7","#0084D6","#009BAA","#009534","#FFC100","#FF7101","#F92801"];
      var color = array_colors[Math.floor(Math.random() * (9 - 0 + 0)) + 0];
      $("#img").text(initial_name+initial_lastname);//place initials in circle
      $("#img").css('background-color',color);//set background color in circle

      lat = response.data.address.geo.lat;
      lng = response.data.address.geo.lng;

      company_name = response.data.company.name;
      company_catchPhrase = response.data.company.catchPhrase;
      company_bs = response.data.company.bs;
    })

    //catch in case of error when obtaining the response of the endpoint
    .catch(function (error) {
      console.log(error);
    });
}

//function to show in a dialog the location of the address, with the use of the google maps api
function show_address(){
  $("#map").show();
  $(".col-xs-12").hide();
  $("#map").dialog({
    modal: true,
            width: 400,
            height: 400,
            buttons: {
                Close: function () {
                    $(this).dialog('close');
                    $("#map").hide();
                    $(".col-xs-12").show();
                }
            },
            open: function () {
                var map_options = {
                    center: new google.maps.LatLng(lat,lng),
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                var map = new google.maps.Map($("#map")[0], map_options);
            }
  });
}

//function to show div with the company data and hide div with the info of the user
function show_company(){
  $("#company_name").text(company_name);
	$("#company_catchPhrase").text(company_catchPhrase);
	$("#company_bs").text(company_bs);
  $("#company").show();
  $(".col-xs-12").hide();
}

//function to indicate the div with the company name is close and show the div with the info of the user
function company_close(){
  $("#company").hide();
  $(".col-xs-12").show();
}