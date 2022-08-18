import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeptValidator from 'App/Validators/DeptValidator';
import departmentTables from 'App/Models/departmentTables';
// import Log from 'App/Models/Log';
// import Logger from '@ioc:Adonis/Core/Logger'
export default class DepartmentsController
 {
    public async insertDept ({request,response} : HttpContextContract)
    {  
        console.log("dept create was performed");
        try{ 
            await request.validate(DeptValidator).catch(err  => response.badRequest(err.messages))
          const dept = new departmentTables()
         // dept.id = request.input('dept_id')
          dept.name = request.input('name')
           await dept.save()
           return 'Inserted into database'
          }
        catch(err){
          return("Incorrect Values. Department Id exists already")
        }
    }
    public async selectallDept (){
        try { return await (await departmentTables.all()).reverse() }
        catch { return ("No data to View")}
    } 
    public async updateRowDept ({request}) 
    { 
        try
        {
            const update = await departmentTables.findOrFail(request.input('id'))
            //update.id = request.input('id')
            update.name =  request.input('name')
            await update.save()
            return update
        }
        catch
        {
            return("Error during Update")
        }
    }
    public async deleteRowDept ({request}) 
    {
        try
        {
            const deletedRow = await departmentTables.findOrFail(request.input('id'))
            await deletedRow.delete()
            return deletedRow
        }
        catch
        {
            return("Data not avaliable")
        }
    }
}