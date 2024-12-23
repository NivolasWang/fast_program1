const mysql = require('mysql2')

//请提前创建一个名叫testout，包含ID,name,age,phone属性的mysql表
const client = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',//输入mysql用户名
  password: '',//输入mysql密码
  database: ''//输入mysql所使用数据库名
})

//数据库交互函数
function get_sql(callback) {
  let sqlStr = 'select * from testout'
  client.query(sqlStr, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function post_sql(callback, data) {
  let sqlStr = 'INSERT INTO testout (name,phone,email,qq,address,favorate) VALUES(?,?,?,?,?,?)'

  client.query(sqlStr, [data.name, data.phone, data.email, data.qq, data.address, 0], (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
    }
    else {
      callback(null, results)
    }
  })
}

function delete_sql(callback, id) {

  let sqlStr = 'DELETE FROM testout WHERE id=?'
  client.query(sqlStr, id, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function find_sql(callback, id) {
  let sqlStr = 'select * from testout WHERE id=?'
  client.query(sqlStr, id, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function patch_sql(callback, data) {
  let sqlStr = 'update testout set name=?,phone=?,email=?,qq=?,address=?,favorate=? where id=?'

  client.query(sqlStr, [data.name, data.phone, data.email, data.qq, data.address, data.favorate, data.ID], (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function favorate_sql(callback, id) {

  let sqlStr = 'update testout set favorate=1 where id=?'
  client.query(sqlStr, id, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function unfavorate_sql(callback, id) {

  let sqlStr = 'update testout set favorate=0 where id=?'
  client.query(sqlStr, id, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

module.exports = {
  get_sql,
  post_sql,
  delete_sql,
  find_sql,
  patch_sql,
  favorate_sql,
  unfavorate_sql
}