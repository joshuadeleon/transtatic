'use strict';

$(function () {
	// //	Create simple toggle element
	// var togglableList = [].slice.call(document.getElementsByClassName("toggle"));
	// togglableList.forEach(function (htmlNode, index) {
	// 	htmlNode.onclick = function (event) {
	// 		var dataActiveValue = this.getAttribute("data-active")
	// 		var valueToggle = (dataActiveValue === null || dataActiveValue === "false")
	// 		htmlNode.setAttribute("data-active", valueToggle);
	// 		console.log("here");
	// 	};
	// });

	readJSONFile("json/books.json", function (json) {
		console.log(json);
		ReactDOM.render(React.createElement(BookList, { data: json.Current }), document.getElementById('booksCurrent'));
		ReactDOM.render(React.createElement(BookList, { data: json.Previous }), document.getElementById('booksPrevious'));
	});
	
	var completed = function (value) {
		if (value < .25) 
			return "fa-battery-empty";
		if (value < .5)
			return "fa-battery-quarter";
		if (value < .75)
			return "fa-battery-half";
		if (value < 1)
			return "fa-battery-three-quarters";
		if (value == 1)
			return "fa-battery-full";
		
		return "fa-exclamation-circle";
	}
	var Book = function Book(props) {
		return React.createElement(
			"div",
			{ "className": "book medium-6 large-3 columns end" },
			React.createElement(
				"div",
				{ "className": "book-item" },
				props.title
			),
			React.createElement(
				"div",
				null,
				React.createElement("i", { "className": "fa " + completed(props.complete) + " book-subItem" }),
				React.createElement(
					"span",
					{ "className": "book-subItem" },
					props.author
				),
				React.createElement(
					"span",
					{ "className": "book-subItem" },
					props.length,
					"pp"
				)
			)
		);
	};

	var BookList = function BookList(props) {
		return React.createElement(
			"div",
			{ "className": "row" },
			props.data.map(function (x) {
				return React.createElement(Book, { 
					title: x.Title, 
					author: x.Author, 
					length: x.Length,
					complete: x.PercentComplete
				});
			})
		);
	};

	
});
