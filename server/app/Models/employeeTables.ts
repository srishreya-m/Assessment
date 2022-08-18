import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import departmentTables from './departmentTables';
export default class employeeTables extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name : string
  @column()
  public dob : Date
  @column()
  public doj : Date
  @column()
 public email : string
 @column()
 public phone : number
@column()
  @hasOne(() => departmentTables)
  public departmentID : HasOne <typeof  departmentTables> 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
