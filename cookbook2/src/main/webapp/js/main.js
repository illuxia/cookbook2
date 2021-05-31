
    $(document).ready(function(){
    	
    	var recipes = {};
    	
    	if(localStorage.getItem('currentUser') == null || localStorage.getItem('currentUser') == '') {
    		$('#login-button').removeClass("no-display");
			$('#register-button').removeClass("no-display");
    	} else {
    		$('#logout-button').removeClass('no-display');
    		$('#post-recipe-button').removeClass('no-display');
    		$('#profile-button').removeClass('no-display');
    		//console.log(JSON.parse(localStorage.getItem('currentUser')).username);	
    	}
    	
    	
    	// Login user
    	$('#login-form').submit(function (e){
    		e.preventDefault();
    		
    		
    		$.ajax({
    			url: "login",
    			method: "POST",
    			data: {
    				username: $('#username').val(),
    				password: $('#password').val()
    			},
    			success: function(data){
    				
    				$('#login-button').remove();
    				$('#register-button').remove();
    				$('#logout-button').removeClass("no-display");
    				$('#post-recipe-button').removeClass("no-display");
    				$('#login-close-button').click();
    				
    				if(data.username != undefined) {
    					localStorage.setItem('currentUser', JSON.stringify({
    						'id': data.id,
    						'username': data.username
    					}));
    					window.location.href = "/";
    				} else {
    					window.location.href = "error.html";
    				}
    				
    			},
    			fail: function(){
    				window.location.href = "error.html";
    			}		
    		});
    		
    	});
    	
    	// Register new user
    	$('#register-form').submit(function (e){
    		e.preventDefault();
    		
    		$.ajax({
    			url: "register",
    			method: "POST",
    			data: {
    				email: $('#register-email').val(),
    				username: $('#register-user').val(),
    				password: $('#register-pass').val(),
    				repeatPassword: $('#confirm-register-pass').val()
    			},
    			success: function(data){
    				
    				$('#login-button').remove();
    				$('#register-button').remove();
    				$('#logout-button').removeClass("no-display");
    				$('#post-recipe-button').removeClass("no-display");
    				$('#register-close-button').click();
    				
    				// login user after successful registration
    				if(data.username != undefined) {
    					
    					$.ajax({
    		    			url: "login",
    		    			method: "POST",
    		    			data: {
    		    				username: $('#register-user').val(),
    		    				password: $('#register-pass').val()
    		    			},
    		    			success: function(data){
    		    				
    		    				$('#login-button').remove();
    		    				$('#register-button').remove();
    		    				$('#logout-button').removeClass("no-display");
    		    				$('#post-recipe-button').removeClass("no-display");
    		    				$('#login-close-button').click();
    		    				
    		    				if(data.username != undefined) {
    		    					localStorage.setItem('currentUser', JSON.stringify({
			    						'id': data.id,
			    						'username': data.username
			    					}));
    		    					window.location.href = "/";
    		    				} else {
    		    					window.location.href = "error.html";
    		    				}
    		    				
    		    			},
    		    			fail: function(){
    		    				window.location.href = "error.html";
    		    			}		
    		    		});
    					
    					
    				} else {
    					window.location.href = "error.html";
    				}
    			},
    			fail: function(){
    				window.location.href = "error.html";
    			}		
    		});
    		
    		
    		
    	});
    	
    	
    	
    	// Logout user
    	$('#logout-button').click(function() {
    		localStorage.clear();
    		$.ajax({
    			url: "/logout",
    			method: "POST"		
    		});
    		window.location.href = "/";
    	});
    	
    	// Post new recipe
    	$('#post-recipe-form').submit(function (e){
    		e.preventDefault();
    		
    		$.ajax({
    			url: "/recipe/add",
    			method: "POST",
    			data: {
    				title: $('#title').val(),
    				description: $('#description').val(),
    				image: $('#image').val(),
    				category: $('#category').find(':selected').val()
    			},
    			success: function(response){
    				
    				$('#post-recipe-close-button').click();
    				window.location.href = "/";
    				if(response.includes("Error:")){
        				alert(response);
        			}
    			},
    			fail: function(){
    				window.location.href = "error.html";
    			}		
    		});
    		
    	});
    	
    	// Show recipes
    	function showAllRecipes(id, title, description, username, category, image) {
		$('#recipe-list').append('<div class="row recipe-item card col-sm" id=' + id + '>' +
									'<div class="col-sm-4">' +
									'<img class="recipe-image" src=' + image + ' alt="Card image cap">' +
									'</div>' +
							        '<div class="col-sm-8">' +
							            '<h4>' + title + '</h4>' +
							            '<p>' + description + '</p>' +
							            '<span>Автор: ' + username + '</span>' +
							            '<br>' +
							            '<span>Категория: ' + category + '</span>' +
							        '</div>' +
					    		 '</div>');
		
    	}
    	
    	function showUserRecipes(id, title, description, username, category_name, category_id, image) {
       		$('#recipe-list').append('<div class="row recipe-item card" id=' + id + '>' +
    				    		        '<div class="col-sm-9 row">' +
	    				    		        '<div class="col-sm-5">' +
	    										'<img class="recipe-image" src=' + image + ' alt="Card image cap">' +
	    									'</div>' +
	    									'<div class="col-sm-7">' +
	    				    		            '<textarea class="update-title">' + title + '</textarea>' +
	    				    		            
	    				    		            '<textarea rows="3" class="update-description">' + description + '</textarea>' +
	    				    		            
	    				    		            '<span>Автор: ' + username + '</span>' +
	    				    		            '<br>' +
	    				    		            '<span">Категория: ' + category_name + '</span>' +
	    				    		            '<input class="update-category" type="hidden" value=' + category_id + '></input>' +
    				    		            '</div>' +
    				    		        '</div>' +
    				    		        '<div class="col-sm-3">' +
    				    		            '<button type="button" class="btn btn-danger pull-right remove-post"><span class="glyphicon glyphicon-remove"></span><span class="hidden-xs"> Изтрий</span></button>' +
    				    		            '<button type="button" class="btn btn-success pull-right update-post"><span class="glyphicon glyphicon-update"></span><span class="hidden-xs"> Промени</span></button>' +
    				    		        '</div>' +
    					    		 '</div>');				    		 
       		       		
       		$('.recipe-item').find('.remove-post').click(function(){
                deleteRecipe($('.recipe-item'), id);
                $('#profile-button').click();
            });
       		
       		$('.recipe-item').find('.update-post').click(function(){
                updateRecipe(id);
                console.log($('.update-title').val() + ' ; ' + $('.update-description').val() + ' ; ' + $('.update-category').val());
            });
        }
    	
    	/*function showUserRecipes(id, title, description, username, category_name, category_id) {
       		$('#recipe-list').append('<div class="row recipe-item" id=' + id + '>' +
    				    		        '<div class="col-sm-9">' +
    				    		            '<textarea class="update-title">' + title + '</textarea>' +
    				    		            '<br><br>' +
    				    		            '<textarea rows="3" class="update-description">' + description + '</textarea>' +
    				    		            '<br>' +
    				    		            '<span>Автор: ' + username + '</span>' +
    				    		            '<br>' +
    				    		            '<span">Категория: ' + category_name + '</span>' +
    				    		            '<input class="update-category" type="hidden" value=' + category_id + '></input>' +
    				    		        '</div>' +
    				    		        '<div class="col-sm-3">' +
    				    		            '<button type="button" class="btn btn-danger pull-right remove-post"><span class="glyphicon glyphicon-remove"></span><span class="hidden-xs"> Изтрий</span></button>' +
    				    		            '<button type="button" class="btn btn-success pull-right update-post"><span class="glyphicon glyphicon-update"></span><span class="hidden-xs"> Промени</span></button>' +
    				    		        '</div>' +
    					    		 '</div>');				    		 
       		       		
       		$('.recipe-item').find('.remove-post').click(function(){
                deleteRecipe($('.recipe-item'), id);
                $('#profile-button').click();
            });
       		
       		$('.recipe-item').find('.update-post').click(function(){
                updateRecipe(id);
                console.log($('.update-title').val() + ' ; ' + $('.update-description').val() + ' ; ' + $('.update-category').val());
            });
        }*/
    	
    	// Get all recipes from database
    	function getAllRecipes(){
    		$.ajax({
    			url: "/recipe/all",
    			method : "GET",
    			success : function(data){
    				recipes = data;
    				var currentUserId = [];
    				var currentCategoryId = [];
    				data.forEach( function (recipe){
    					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
    					
    					if(!currentUserId.includes(recipe.user.id)) {
    						$('#select-user').append('<option value=' + recipe.user.id + '>' + recipe.user.username + '</option>');
    						currentUserId.push(recipe.user.id);
    					}
    					if(!currentCategoryId.includes(recipe.category.id)) {
    						$('#select-category').append('<option value=' + recipe.category.id + '>' + recipe.category.name + '</option>');
    						currentCategoryId.push(recipe.category.id);
    					}
    					
    					// click single recipe
    			    	$('.recipe-image').click(function() {
    			    		getSingleRecipe(recipe.id);
    			    		console.log(id);
    			    	});
    				});    
    				
    				
    				
    			},fail : function (){
    				alert("Recipes could not be loaded!");
    			}
    		
    		});    		
    	}
    	
    	// Delete recipe from database
    	function deleteRecipe(container, id){
        	$.ajax({
        		url: "/recipe/delete",
        		method : "DELETE",
        		data : { id : id},
        		complete : function(data){
        			
        			switch(data.status){
        			case 200:
        				container.remove();
        				$('#profile-button').click();
        				break;
        				
        			case 401:
        				
        				window.location.href = "/";
        				break;
        				
        			case 404:
        				alert("Error deleting recipe!");
        				break;        				
        			}
        			
        			
        		}
        	});
        }
    	
    	// Update recipe in database
    	function updateRecipe(id) {
    		var recipeId = '#'+id;
    		var title = $(recipeId).find('.update-title').val();
    		var description = $(recipeId).find('.update-description').val();
    		var category_id = $(recipeId).find('.update-category').val();
    		$.ajax({
        		url: "/recipe/update",
        		method : "PUT",
        		data : {id : id,
        				title : title,
        				description : description,
        				category_id : category_id},
        		complete : function(data){
        			
        			switch(data.status){
        			case 200:
        				//alert("Успешно променихте рецептата!");
        				// $('#myModal').modal('show');
        				break;
        			case 401:
        				
        				window.location.href = "/";
        				break;
        				
        			case 404:
        				alert("Грешка при изтриване на рецептата!");
        				break;        				
        			}
        			
        			
        		}
        	});
    	}
    	
    	
    	// Filter recipes by username
    	$('#select-user').change(function() {
    		var selectedUser = $(this).find(":selected").val();
    		var selectedCategory = $('#select-category').find(":selected").val();
    		$('#recipe-list').empty();
    		
    		recipes.forEach( function (recipe){
				if(selectedUser == "0" && selectedCategory == "0") {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}else if (selectedUser == "0" && recipe.category.id == selectedCategory) {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}else if (recipe.user.id == selectedUser && recipe.category.id == selectedCategory) {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}else if (recipe.user.id == selectedUser && selectedCategory == "0") {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}
    		
    		});
    	});
    	
    	// Filter recipes by category
    	$('#select-category').change(function() {
    		var selectedUser = $('#select-user').find(":selected").val();
    		var selectedCategory = $(this).find(":selected").val();
    		$('#recipe-list').empty();
    		
    		recipes.forEach( function (recipe){
    			if(selectedUser == "0" && selectedCategory == "0") {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}else if (selectedUser == "0" && recipe.category.id == selectedCategory) {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}else if (recipe.user.id == selectedUser && recipe.category.id == "0") {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}else if (recipe.user.id == selectedUser && recipe.category.id == selectedCategory) {
					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
					clickRecipeImage(recipe.id);
				}
    		
    		}); 
    	});
    	
    	// Filter recipes by keyword
    	$('#search-button').click(function(e) {
    		e.preventDefault();
    		$('#recipe-list').empty();
    		$('#options-filter').addClass('no-display');
    		getRecipesMatching();
    		// return;
    	});
    	
    	// Get recipes by matching keyword from database
    	function getRecipesMatching() {
    		$.ajax({
    			url: "/recipe/search",
    			method : "POST",
    			data: {
    				keyword: $('#search-input').val()
    			},
    			success : function(data){
    				data.forEach( function (recipe){
    					showAllRecipes(recipe.id, recipe.title, recipe.description, recipe.user.username, recipe.category.name, recipe.image);
    					console.log(recipe);
    					
    					// click single recipe
    			    	$('.recipe-image').click(function() {
    			    		getSingleRecipe(recipe.id);
    			    		console.log(id);
    			    	});
    				});    				
    				
    			},fail : function (){
    				alert("Recipes could not be loaded!");
    			}
    		
    		});
    	};
    	
    	
    	// Get user recipes from database
    	function getUserRecipes(){
    		$.ajax({
    			url: "/recipe/user",
    			method : "GET",
    			success : function(data){
    				data.forEach( function (data){
    					showUserRecipes(data.id, data.title, data.description, data.user.username, data.category.name, data.category.id, data.image);
    				});  				
    				
    			},fail : function (){
    				alert("Recipes could not be loaded!");
    			}
    		
    		});    
    	}
    	
    	$('#profile-button').click(function(e) {
    		e.preventDefault();
    	});
    	
    	$('#profile-button').click(function() {
    		$('#recipe-list').empty();
    		$('#options-filter').addClass('no-display');
    		getUserRecipes();
    	});
    	
    	// Get single recipe from database
    	function getSingleRecipe(id){
    		$.ajax({
    			url: "/recipe/" + id,
    			method : "GET",
    			success : function(data){
    				console.log(data);
    				$('#recipe-list').empty();
    				$('#options-filter').addClass('no-display');
    				showAllRecipes(data.id, data.title, data.description, data.user.username, data.category.name, data.image);
    				showCommentCount(data.comments.length);
    				data.comments.forEach( function (comment){
    					showComments(comment.title, comment.user.username);
    				});  
    				
    				if(localStorage.getItem('currentUser') != null){
    					showCommentForm(data.id);
    				}
    				
    				
    			},fail : function (){
    				alert("Recipes could not be loaded!");
    			}
    		
    		});    		
    	}
    	
    	
    	/*$('#profile-button').click(function() {
    		$('#recipe-list').empty();
    		$('#options-filter').addClass('no-display');
    		getSingleRecipe();
    		return;
    	});*/
    	
    	// Load categories in add new recipe select
    	$('#post-recipe-button').click(function() {
    		$.ajax({
        		url: "/recipe/categories",
        		method : "GET",
        		data : {},
        		success : function(data){
        			$('#category').empty();
        			data.forEach( function (category){
    					$('#category').append('<option value=' + category.id + '>' + category.name + '</option>');
    				});
        		}
        	});
    	});
    	
    	// Show comment form
    	function showCommentForm(recipe_id) {
    		$('#recipe-list').append('<div class="row recipe-item col-sm" id=' + recipe_id + '>' +
    									'<form class="col-sm d-flex">' +
    									'<textarea class="comment-text col-sm-10" placeholder="Напишете коментар"></textarea>' +
    									'<button type="submit" id="submit-button" class="btn btn-primary m-2"> Публикувай </button>' +
    									'</form>' +
    					    		 '</div>');

			$('#submit-button').click(function(e) {
				e.preventDefault();
				$.ajax({
					url: "/comment/add",
					method: "POST",
					data: {
						title: $('.comment-text').val(),
						recipe: recipe_id
					},
					success: function(response){
						getSingleRecipe(recipe_id);
						return;
						if(response.includes("Error:")){
							alert(response);
						}
					},
					fail: function(){
						window.location.href = "error.html";
					}		
				});
			});
        }
    	
    	// Show comments
    	function showComments(comment, user) {
    		$('#recipe-list').append('<div class="row recipe-item card col-sm d-flex flex-column">' +
    									'<p class="comment-title col-sm lead" >' + comment + '</p>' +
    									'<span class="comment-user col-sm" > Публикуван от: ' + user + '</span>' +
    					    		 '</div>');
    	}
    	
    	// Show comment count
    	function showCommentCount(count) {
    		$('#recipe-list').append('<div class="row col-sm">' +
										'<p class="comment-count col-sm lead font-weight-bold" > Коментари (' + count + ')</p>' +
						    		 '</div>');
    	}
    	
    	// click single recipe
    	function clickRecipeImage(recipe_id) {
    		$('.recipe-image').click(function() {
        		getSingleRecipe(recipe_id);
        		console.log(id);
        	});
    	}
    	
    	
    	getAllRecipes();
    	
    	
    	
    	
    })
		