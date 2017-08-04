$(document).ready(function(){
	$('#id_blogposts').click(function(){
		options_index(1);
	});
	$('#id_usuarios').click(function(){
		options_index(2);
	});
	$('#id_user').click(function(){
		options_index(3);
	});
	$(".principal_title").click(function(){
		if(window.location.href == 'file:///C:/Users/amontoya/Downloads/HTML%20Sof/index.html')
			window.location.href = "index.html";
		else
			window.location.href = "../index.html";
	});
});


//function in which recieve a parameter to indicate which view they want to see
function options_index(id_option){
	switch(id_option){
		case 1:
			go_to_page("view/blogpost_list.html");
		break;
		case 2:
			go_to_page("view/users_list.html");
		break;
		case 3:
			//set localstorage variable
			localStorage.setItem("id_usuario", 1);
			go_to_page("view/user.html");
		break;
	}
}

//function to change page
function go_to_page(page) {
    window.location.href = page;
}