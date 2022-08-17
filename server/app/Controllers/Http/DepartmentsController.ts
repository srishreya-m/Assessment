import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeptValidator from 'App/Validators/DeptValidator';
import departmentTables from 'App/Models/departmentTables';
export default class DepartmentsController {

    public async create({request,response} : HttpContextContract)
        //public async store({request : HttpContextContract)
    {  console.log("dept create works");
        try{ 
            await request.validate(DeptValidator).catch(err  => response.badRequest(err.messages))
          const dept = new departmentTables()
         // dept.id = request.input('dept_id')
          dept.name = request.input('data.name')
          dept.save()
           return 'Inserted into database'
          }
        catch(err){
          return 'Cannot display data'
        }
    }
    public async display ()
    {
        const Department = await departmentTables.all();
        console.log("dept display works");
        if (Department[0] == null)
        {
            return "No department to show"
        }
        return Department
    }
    public async show({request, response} : HttpContextContract) 
    {
        try{
            await request.validate(DeptValidator).catch(err  => response.badRequest(err.messages))
            const dpmt = await departmentTables.findOrFail(Number(request.input('data.id')));
            return dpmt;
        }
        catch
        {
            return 'Department doesnot exists'
        }  
     }
    public async update({request, response} : HttpContextContract)
    {
        // console.log(request.body());  
        // console.log(request.input('data.dept_id'));
        console.log("dept update works");
        try{
           await request.validate(DeptValidator).catch(err  => response.badRequest(err.messages))
            const dpmt = await departmentTables.findOrFail(Number(request.input('data.id')));
            dpmt.name = request.input('data.name');
            await dpmt.save();
            return "Department name successfully updated"
        }catch{
            return "Department ID  does not exists"
        }
    }
    public async delete({request} : HttpContextContract)
    {
        console.log("dept deletey works");
        // console.log(request.body());  
        // console.log(request.input('id'));
        try{
           // await request.validate(DeptValidator).catch(err  => response.badRequest(err.messages))
            const dpmt = await departmentTables.findOrFail(Number(request.input('data.id')));
            await dpmt.delete();
            return "Department successfully deleted"
        }catch{
            return "Department ID doesnot exists"
        }
    }
}