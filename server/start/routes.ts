import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.post('/insertEmp','EmployeesController.insertEmp')
  Route.get('/selectallEmp','EmployeesController.selectallEmp')
  Route.put('/updateRowEmp','EmployeesController.updateRowEmp')
  Route.delete('/deleteRowEmp','EmployeesController.deleteRowEmp')
  }).prefix('Emp')
  
  Route.group(() => {
    Route.post('/insertDept','DepartmentsController.insertDept')
    Route.get('/selectallDept','DepartmentsController.selectallDept')
    Route.put('/updateRowDept','DepartmentsController.updateRowDept')
    Route.delete('/deleteRowDept','DepartmentsController.deleteRowDept')
  }).prefix('Dept')
}).middleware('Auth')
//
