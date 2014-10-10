describe('Cat Box Directive', function() {

	var catImageServiceMock;
	var getCatPromise;
	var $scope;
	var element;
	var sut;

	beforeEach(module('app'));

	beforeEach(module('partials'));

	beforeEach(module(function($provide) {
		catImageServiceMock = jasmine.createSpyObj('catImageService', ['getCat']);
		$provide.value('catImageService', catImageServiceMock);
	}));

	beforeEach(inject(function($q, $compile, $rootScope) {
		$scope = $rootScope;
		$scope.submitMock = jasmine.createSpy('submitMock');
		getCatPromise = $q.defer();
		catImageServiceMock.getCat.and.returnValue(getCatPromise.promise);

		element = angular.element('<cat-box return-action="submitMock(catModel)"></cat-box>');
		$compile(element)($scope);
		$scope.$digest();

		sut = element.isolateScope();
	}));

	describe('construction', function() {

		it('should load the template', function() {
			expect(element.children().length == 1).toBeTruthy();
		});

		it('should call catImageService.getCat', function() {
			expect(catImageServiceMock.getCat).toHaveBeenCalled();
		});

		it('should set imgSrc with the response of the cat service', function() {
			var testImg = 'testImg.png';
			getCatPromise.resolve(testImg);
			$scope.$digest();
			expect(sut.imgSrc).toBe(testImg);
		});

	});

	describe('getCatImgSrc', function() {

		it('should call the catImageService', function() {
			catImageServiceMock.getCat.calls.reset();
			sut.getCatImgSrc();
			expect(catImageServiceMock.getCat).toHaveBeenCalled();
		});
		
	});

	describe('onDone', function() {
		
		it('should call submitMock with the right value', function() {
			sut.firstInput = 'first';
			sut.secondInput = 'second';
			sut.imgSrc = 'testImg.png';
			sut.onDone();
			expect($scope.submitMock).toHaveBeenCalledWith({firstInput: 'first', secondInput: 'second', imgSrc: 'testImg.png'});
		});

	});

});

