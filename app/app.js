var app = angular.module('app', []);

app.directive('catBox', function(catImageService) {
	return {
		restrict: 'E',
		templateUrl: 'cat-box.html',
		scope: {
			firstLabel: '@',
			secondLabel: '@',
			returnAction: '&'
		},
		link: function(scope) {
			scope.onDone = function() {
				var catModel = {
					firstInput: scope.firstInput,
					secondInput: scope.secondInput,
					imgSrc: scope.imgSrc
				};
				scope.returnAction({catModel: catModel});
			};
			scope.getCatImgSrc = function() {
				catImageService.getCat()
					.then(function(imgSrc) {
						scope.imgSrc = imgSrc;
					});
			};
			scope.getCatImgSrc();
		}
	};
});

app.service('catImageService', function($q, $http) {
	this.getCat = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/catimage'
		})
		.success(function(img) {
			deferred.resolve(img);
		});
		return deferred.promise;
	};
});

app.controller('CatGalleryCtrl', function() {
	this.cats = [];
	this.addCat = function(catModel) {
		var cat = {
			firstName: catModel.firstInput,
			lastName: catModel.secondInput,
			imgSrc: catModel.imgSrc
		};
		this.cats.push(cat);
	};
});
