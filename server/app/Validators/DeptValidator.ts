import { schema, CustomMessages ,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeptValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
     id : schema.number([rules.required()]),
      name : schema.string([rules.maxLength(20) , rules.required(),rules.unique({table : 'departmentTables', column : 'name'}) ]),
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
  public messages: CustomMessages = {}
}
