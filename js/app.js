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

	var booksJson = readJSONFile("json/books.json");
	console.log(books);

	var Book = function Book(props) {
		return React.createElement(
			"div",
			{ "class": "book medium-6 large-3 columns" },
			React.createElement(
				"div",
				{ "class": "book-item" },
				props.Title
			),
			React.createElement(
				"div",
				null,
				React.createElement("i", { "class": "fa fa-battery-empty book-subItem" }),
				React.createElement(
					"span",
					{ "class": "book-subItem" },
					props.Author
				),
				React.createElement(
					"span",
					{ "class": "book-subItem" },
					props.Length,
					"}pp"
				)
			)
		);
	};

	var BookList = function BookList(props) {
		return React.createElement(
			"div",
			{ "class": "row" },
			props.data.map(function (x) {
				return React.createElement(Book, { title: x.title, author: x.author });
			})
		);
	};

	ReactDOM.render(React.createElement(BookList, { data: booksJson.Current }), document.getElementById('books'));
});
