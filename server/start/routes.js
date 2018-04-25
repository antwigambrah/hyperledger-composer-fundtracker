

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/


const Route = use('Route');

const User = use('App/Models/User');
Route.post('register', 'AuthController.register');
Route.post('login', 'AuthController.login');


Route.get('/', () => 'Hello nodejs');
Route.get('/user', 'UserController.user');

Route.group(async () => {
  Route.post('/create', 'ParticipantController.create');
  Route.post('/fund-approver/create', 'FundApproverController.create');
  Route.get('/fund-approver/all', 'FundApproverController.all');
  Route.get('/fund-approver/:id', 'FundApproverController.getById');
}).prefix('/participant').middleware('auth');

Route.group(() => {
  Route.get('/historian/view', 'ProjectController.viewHistorian');
  Route.post('/mmda/create', 'MmdaController.create');
  Route.get('/mmda/all', 'MmdaController.all');
  Route.get('/mmda/:id', 'MmdaController.getById');
  Route.post('/mda/create', 'MdaController.create');
  Route.get('/mda/all', 'MdaController.all');
  Route.get('/mda/:id', 'MdaController.getById');
  Route.post('/create', 'AssetController.create');
  Route.post('/budget/create', 'BudgetController.create');
  Route.get('/budget/all', 'BudgetController.all');
  Route.post('/fund-source/create', 'FundSourceController.create');
  Route.get('/fund-source/all', 'FundSourceController.all');
  Route.post('/fund-receipient/create', 'FundReceipientController.create');
  Route.get('/fund-receipient/all', 'FundReceipientController.all');
  Route.post('/program/create', 'ProgramController.create');
  Route.get('program/all', 'ProgramController.all');
  Route.post('/project/create', 'ProjectController.create');
  Route.get('/project/all', 'ProjectController.all');
  Route.get('/project/:id/historian', 'ProjectController.getHistorian');
  Route.get('/project/:mmda', 'ProjectController.findByMmda');
  Route.get('/project/mmda/:id', 'ProjectController.getById');
  Route.post('/project/attachreceipient', 'ProjectController.attachReceipient');
  Route.post('/project/initiatetransfer', 'ProjectController.initiateTransfer');
  Route.post('/project/mofapprove', 'ProjectController.mofApprove');
  Route.post('/project/controllerapprove', 'ProjectController.controllerapprove');
  Route.post('/expense/create', 'ExpenseController.create');
  Route.get('/expense/all', 'ExpenseController.all');
  Route.post('/role/create', 'RoleController.create');
  Route.get('/role/all', 'RoleController.all');
  Route.get('/role/:id', 'RoleController.getById');
}).prefix('asset').middleware('auth');
