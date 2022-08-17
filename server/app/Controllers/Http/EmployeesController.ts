import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import employeeTables from 'App/Models/employeeTables'
import Log from 'App/Models/Log';
import EmpValidator from 'App/Validators/EmpValidator';
export default class EmployeesController {
public async create({request,response} : HttpContextContract)
  { 
    console.log("emp create works");
    
     try{ await request.validate(EmpValidator).catch(err  => {response.badRequest(err.messages) })
        const logs = new Log()
    logs.action = ("employee create was performed")
    logs.save()
    const user = new employeeTables ()
        user.name = request.input('data.name')
        user.dob = request.input('data.dob')
        user.doj = request.input('data.doj')
        user.email = request.input('data.email') 
        user.phone = request.input('data.phone')
        user.departmentID=request.input('data.departmentID')
        user.save()
         return 'Inserted into database' 
        }
      catch(err){ 
        return 'Cannot display data'
      } 
  }
  public async display () 
  {
    console.log("emp display was performed");
    try{
    //     const logs = new Log()
    // logs.action = ("employee display works")
    // logs.save()
        const Emp = await employeeTables.all();
      if (Emp[0] == null)
      {
          return "No employee to show"
      }
      return Emp }
        catch{
            return ("Employee ID / Department ID incorrect")
        }
  }
  public async show({request,response} : HttpContextContract)
  {
      try{
        const logs = new Log()
    logs.action = ("employee display by id was performed")
    logs.save()
        await request.validate(EmpValidator).catch(err  => {response.badRequest(err.messages) })
          const emp = await employeeTables.findOrFail(Number(request.input('data.id')));
          return emp;
      }
      catch
      {
          return 'Employee doesnot exists'
      }  
   }
  public async update({request,response} : HttpContextContract)
  {
    console.log("emp update works");
      try{
        const logs = new Log()
    logs.action = ("employee update was performed")
    logs.save()
    await request.validate(EmpValidator).catch(err  => {response.badRequest(err.messages) })
          const emp = await employeeTables.findOrFail(Number(request.input('data.id')));
          emp.name = request.input('data.name')
          emp.dob = request.input('data.dob')
          emp.doj = request.input('data.doj')
          emp.email = request.input('data.email') 
          emp.phone = request.input('data.phone')
          emp.departmentID=request.input('data.departmentID')
         await emp.save();
          return "Employee details successfully updated"
      }catch(err){
          console.log(err);
          return "Employee ID  doesnot exists"
      }
  }
  public async delete({request,response} : HttpContextContract)
  {
    console.log("employee delete was performed");
    try{
          await request.validate(EmpValidator).catch(err  => {response.badRequest(err.messages) })
          const emp = await employeeTables.findOrFail(Number(request.input('data.id'))); 
          await emp.delete();
          return "Employee successfully deleted"
      }catch{
          return "Employee ID doesnot exists"
      }
  }
}
