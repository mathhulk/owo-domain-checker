let template = { };
let domains = { };
let search = { };

function replace(template, replace) {
	$.each(replace, function(index, value) {
		template = template.replace(new RegExp(index, "g"), value);
	});
	
	return template;
}

function sort( ) {
	$("#domains .row").empty( );
	
	$.each(domains, function(index, value) {
		if(validate(index, value)) {
			$("#domains .row").append(replace(template, {"{{ status }}": value.online ? "online" : "offline", "{{ name }}": index}));
		}
	});
}

function validate(domain, data) {
	if(typeof(search.online) === "boolean" && search.online !== data.online) {
		return false;
	}
	
	if(search.term && !domain.includes(search.term)) {
		return false;
	}
	
	return true;
}

$(document).ready(function( ) {
	
	$(document).on("click", ".dropdown-item", function( ) {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			
			delete search.online;
		} else {
			$(this).parent( ).children( ).removeClass("active");
			$(this).addClass("active");
			
			search.online = $(this).attr("data-status") === "true";
		}
		
		sort( );
	});
	
	$(document).on("input", "input", function( ) {
		search.term = $(this).val( );
		
		sort( );
	});
	
	$.get("status", function(data) {
		domains = data.domains;
		
		$.get("resources/templates/service.tpl", function(service) {
			$("#services .row").empty( );
			
			$.each(data.services, function(index, value) {
				$("#services .row").append(replace(service, {"{{ status }}": value.online ? "online" : "offline", "{{ name }}": index, "{{ description }}": value.description, "{{ href }}": value.href}));
			});
		});
		
		$.get("resources/templates/domain.tpl", function(domain) {
			template = domain;
			
			sort( );
		});
	});
	
});