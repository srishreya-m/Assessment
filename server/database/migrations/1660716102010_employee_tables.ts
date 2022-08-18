import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class extends BaseSchema {
  protected tableName = 'employeeTables'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name',255);
      table.date('dob');
      table.date('doj');
      table.string('email',255).unique;
      table.integer('phone');
      
      table.integer('departmentId').references('departmentTables.id');  
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
     
    })
  }
  /*
  this.schema.createTable(this.tableName, (table) => {
      table.integer('id')
      table.string('name',255);
      table.string('email',255);
      table.string('phone_no');
      table.integer('dept_id');    

  */

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
