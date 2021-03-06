$(document).ready(function() {


	var requestUrl = 'http://raw.githubusercontent.com/Fyrd/caniuse/master/data.json';
	var localRequestUrl = 'data.json';


	$.getJSON(localRequestUrl, function(response) {

		var cssProperties = [];

		console.log(response);

		// Loop through each property
		$.each(response.data, function(index, value) {

			var added = false;

			// If has CSS related category
			if ( !($.inArray('CSS', value.categories) == -1) | !($.inArray('CSS2', value.categories) == -1) | !($.inArray('CSS3', value.categories) == -1) ) {
			
				// Loop through each browser
				$.each(value.stats, function(i, v) {

					//Loop through each version
					$.each(v, function(version, support) {

						if ( support == 'y x' ) {
							cssProperties.push(value);
							added = true;
						}

						// If property is already added to list, break out of version loop
						if (added) { return false; }
					})

					// If property is already added to list, break out of browser loop
					if (added) { return false; }

				}); 

			}

	
		})


		
		var source = $("#properties-template").html()
		var template = Handlebars.compile(source)
		var output = template( {Property: cssProperties} )

		$("#whichvendorprefix").html(output)

		//console.log(cssProperties);

	});

	
})