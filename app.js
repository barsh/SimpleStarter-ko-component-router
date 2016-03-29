'use strict'

window.ko = require('knockout')
require('ko-component-router')

ko.components.register('app', {
  viewModel: class App {
    constructor() {
      this.routes = {
        '/': 'home',
        '/users/:id': 'user',
        '*': '404'
      }
    }
  },
  template: `
    <ko-component-router params="
      routes: routes,
      base: '',
      hashbang: false">
    </ko-component-router>
  `
})

ko.components.register('home', {
  template: `
    <a href="#" data-bind="path:'/users/1234'">Show user 1234</a><br/>
    <a href="#" data-bind="path:'/users/5678'">Show user 5678</a><br/>
    <a href="#" data-bind="path: '/invalid'">404 page</a>
    <router-info></router-info>
  `
})

ko.components.register('404', {
  template: `404:
    <a href="#" data-bind="path:'/'">back</a>
    <router-info></router-info>
  `
})

ko.components.register('user', {
  viewModel: class User {
    constructor(ctx) {
      // ctx contains a bunch of information about the
      // current state of the router

      // many are read/write observables,
      // see each section for more info
      }
  },
  template: `
    User <span data-bind="text: $router.params.id"></span><br/>
    <a href="#" data-bind="path: '/'">back</a>
    <router-info></router-info>  `
})

ko.components.register('router-info', {
  template: `
<hr/>
<h4/>$router info</h4>
<pre>
$router.params = <span data-bind="text: ko.toJSON($router.params)"></span>
$router.path() = '<span data-bind="text: $router.path"></span>'
$router.route().component = '<span data-bind="text: $router.route().component"></span>'
</pre>
  `
})


ko.applyBindings()
