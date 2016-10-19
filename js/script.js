var validationApp = angular.module('validationApp', []);

validationApp.controller('mainController', function($scope) {

    $scope.submitForm = function() {

        if ($scope.userForm.$valid) {
          alert('You have successfully added a new contact!');
        }

    };

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchContact = '';

    $scope.persons = [
        { name: 'Marissa', surname: 'Mayer', phone: 0957251787, age: 40, gender: 'female' },
        { name: 'Bill', surname: 'Gates', phone: 0503401548, age: 60, gender: 'male' },
        { name: 'Pol', surname: 'Allen', phone: 0674500010, age: 63, gender: 'male' },
        { name: 'Larry', surname: 'Page', phone: 0635529980, age: 43, gender: 'male' }
    ];

    $scope.addLine = function () {
        var newItem1 = $scope.user.name;
        var newItem2 = $scope.user.surname;
        var newItem3 = $scope.user.phone;
        var newItem4 = $scope.user.age;
        var newItem5 = $scope.user.gander;
        $scope.persons.push({ name: newItem1, surname: newItem2, phone: newItem3, age: newItem4, gender: newItem5 });


    };

    $scope.removeChoice = function() {
        var lastItem = $scope.persons;
        $scope.persons.pop(lastItem);
    };

});



validationApp.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;

                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener);
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});
validationApp.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});