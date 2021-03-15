'use strict'

const UserController = use('App/Controllers/Http/UserController')
const ProjectController = use('App/Controllers/Http/ProjectController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  Route.post('user/register', 'UserController.store');
  Route.post('user/login', 'UserController.login');
  Route.get('projects/', 'ProjectController.index').middleware('auth');
  Route.post('projects/create', 'ProjectController.create').middleware('auth');
  Route.delete('projects/destroy/:id', 'ProjectController.destroy').middleware('auth');
  Route.patch('projects/update/:id', 'ProjectController.update').middleware('auth');
}).prefix('api/v1/');
