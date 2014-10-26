(function() {
	"use strict";

	var app = angular
		.module('productResourceMock', 
				['ngMockE2E']);

	app.run(function($httpBackend){
		var products = [
			{
				"productId":1,
				"productName": "Leaf Rake",
				"productCode": "GDN-0011",
				"releaseDate": "March 19, 2009",
				"description": "Leaf Rake with 48inch handle",
				"cost": 9.00,
				"price": 19.95,
				"category": "garden",
				"tags": ["leaf", "tool"],
				"imageUrl": "https://openclipart.org/image/300px/svg_to_png/2513/Machovka_Rake.png"
			},
			{
				"productId":5,
				"productName": "Hammer",
				"productCode": "TBX-0048",
				"releaseDate": "March 21, 2013",
				"description": "Curved law steel hammer",
				"cost": 1.00,
				"price": 8.99,
				"category": "toolbox",
				"tags": ["tool"],
				"imageUrl": "https://openclipart.org/image/300px/svg_to_png/170841/qubodup-hammer.png"
			},
			{
				"productId":6,
				"productName": "Nails",
				"productCode": "TOX-0048",
				"releaseDate": "March 11, 2003",
				"description": "Curved Nails",
				"cost": 2.00,
				"price": 4.99,
				"category": "costume",
				"tags": ["costume"],
				"imageUrl": "https://openclipart.org/image/300px/svg_to_png/86515/Halloween_Nails.png"
			},
			{
				"productId":8,
				"productName": "Magnet",
				"productCode": "MAG-0048",
				"releaseDate": "Feb 11, 2003",
				"description": "Small Magnet",
				"cost": 12.00,
				"price": 24.99,
				"category": "tool",
				"tags": ["tool"],
				"imageUrl": "https://openclipart.org/image/300px/svg_to_png/1039/johnny_automatic_magnet.png"
			}
		];

		var productUrl = "/api/products"
		var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');

		$httpBackend.whenGET(productUrl).respond(products);

		$httpBackend.whenGET(editingRegex).respond(function(method, url, data){
			var product = {'productId': 0};
			var parameters = url.split('/');
			var length = parameters.length;
			var id = parameters[length - 1];

			if (id > 0){
				for (var i = 0; i < products.length; i++) {
					if (products[i].productId == id){
						product = products[i];
						break;
					}
				};
			}
			return [200, product, {}];
		});

		$httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
			var product = angular.fromJson(data);

			if (!product.productId) {
				product.productId = product[products.length - 1].productId + 1;
				products.push(product);
			}else 
				{
				for (var i = 0; i < products.length; i++) {
					if (products[i].productId == product.productId){
						products[1] = product;
						break;
					}
				};
			}
			return [200, product, {}];
		});

		$httpBackend.whenGET(/app/).passThrough();

	});

}());