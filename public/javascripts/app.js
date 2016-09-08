//Our main angular app definition module.
var app =  angular.module('todoApp', ['ui.router']);

//State management for our application using ui.router
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        });

});
