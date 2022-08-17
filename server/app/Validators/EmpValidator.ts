import { schema, CustomMessages ,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpValidator {
  constructor(protected ctx: HttpContextContract) {}
/*
id: number
name : string
dob : Date
doj : Date
email : string
phone : number
departmentID: number
createdAt: DateTime
updatedAt: DateTime 
    */
  public schema = schema.create({
   id : schema.number([rules.required()]),
   name : schema.string([rules.maxLength(20) , rules.required(),rules.unique({table : 'employeeTables', column : 'name'}) ]),
   dob : schema.date(),
   doj : schema.date(),
   email : schema.string([rules.required]), 
   phone : schema.number([rules.required, rules.maxLength(11)]), 
   departmentID : schema.number([rules.required]), 
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'id.required': 'Please enter the Dept ID',
  'name.maxLength' : 'Maximum Characters 20',
  'phone.unique' : 'Number must be Unique',}
}
