import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('/display', 'EmployeesController.display');
    Route.post('/create', 'EmployeesController.create');
    Route.post('/show', 'EmployeesController.show');
    Route.put('/update', 'EmployeesController.update');
    Route.delete('/delete','EmployeesController.delete');
  }).prefix('Emp')
  
  Route.group(() => {
    Route.get('/display', 'DepartmentsController.display');
    Route.post('/create', 'DepartmentsController.create');
    Route.get('/show', 'DepartmentsController.show');
    Route.put('/update', 'DepartmentsController.update');
    Route.delete('/delete','DepartmentsController.delete');
  }).prefix('Dept')
}).middleware('Auth')
//
