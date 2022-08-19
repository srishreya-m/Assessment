import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import employeeTables from 'App/Models/employeeTables'
// import Log from 'App/Models/Log';
import EmpValidator from 'App/Validators/EmpValidator';
export default class EmployeesController {

    public async store({request,response} : HttpContextContract)
    { 
        // console.log(request.input('name')); 
        console.log(request.input('data'));
       try{ 
        await request.validate(EmpValidator).catch(err  => {response.badRequest(err.messages) })
          const user = new employeeTables()
          // const dept = new Department()
          console.log(request.input('data.name'));
          user.name = request.input('data.name')
          user.dob = request.input('data.dob') 
          user.doj = request.input('data.doj')
          user.email = request.input('data.email') 
          user.phone = request.input('data.phone') 
          user.departmentID= request.input('data.departmentID') 
          user.save()
           return 'Inserted into database' 
          }
        catch(err){
          return 'Cannot display data'
        }}

 public async insertEmp({request,response} : HttpContextContract)
 {
     try {
         await request.validate(EmpValidator).catch(err  => {response.badRequest(err.messages) })
         const newRow = new employeeTables()
         //newRow.id = request.input('id')
         newRow.name = request.input('name')
         newRow.dob = request.input('dob')
         newRow.doj = request.input('doj')
         newRow.email = request.input('email')
         newRow.phone = request.input('phone')
         newRow.departmentID = request.input('departmentID')
         await newRow.save()   
         return ' Successfully Inserted !'
     }
     catch {
         return("Incorrect Values")
     }
 }
 public async selectallEmp() { 
     try
     {   const all = await employeeTables.all()
         return all.reverse()
     }
     catch 
     {return("No Data To Display")}
 }

 public async updateRowEmp ({request}) 
 { 
     try
     {
         const update = await employeeTables.findOrFail(request.input('id'))
         update.name =  request.input('name')
         update.dob = request.input('dob')
         update.doj = request.input('doj')
         update.email = request.input('email')
         update.phone = request.input('phone')
         update.departmentID = request.input('departmentID')
         await update.save()
         return update
     }
     catch
     {
         return("Error during Update")
     }     
 }

 public async deleteRowEmp ({request}) 
 {
     try
     {
         const deletedRow = await employeeTables.findOrFail(request.input('id'))
         await deletedRow.delete()
         return deletedRow
     }
     catch
     {
         return("Data not avaliable")
     }
 }
}
