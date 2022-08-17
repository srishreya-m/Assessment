import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import departmentTables from './departmentTables';
import {JoinColumn, OneToOne} from 'typeorm';

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
//  public departmentID : number
  @OneToOne(() => departmentTables)
  @JoinColumn()
  public departmentID: departmentTables;
//table.integer('department_id'); 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
