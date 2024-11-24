const express = require('express')
const mysql = require('mysql2')
const path = require('path')
const router = express.Router()
const xlsx = require("node-xlsx")
let fs = require("fs")


const sql_function = require('./mysql')

router.get('/get', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  sql_function.get_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log(results)
      res.send(results)
    }
  })
})

//存数据
router.post('/post', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body)
  sql_function.post_sql((err, results) => {
    if (err) {
      console.error('Error fetching data')
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("存储成功")
      res.send("存储成功")
      console.log('-------------------------------------')
    }
  }, req.body)
})

//删数据
router.delete('/delete', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let id = req.body.ID
  console.log(req)

  sql_function.delete_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("删除成功")
      res.send("删除成功")
      console.log('-------------------------------------')
    }
  }, id)
})

//查找数据
router.get('/find', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let id = req.query.ID
  console.log(id)

  sql_function.find_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("寻找成功")
      res.send(results)
    }
  }, id)
})

//修改数据
router.post('/patch', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body)

  sql_function.patch_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("替换成功")
      res.send(results)
    }
  }, req.body)
})

router.post('/favorate', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let id = req.body.ID
  console.log(req)

  sql_function.favorate_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("收藏成功")
      res.send("收藏成功")
      console.log('-------------------------------------')
    }
  }, id)
})

router.post('/unfavorate', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let id = req.body.ID
  console.log(req)

  sql_function.unfavorate_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("取消成功")
      res.send("取消成功")
      console.log('-------------------------------------')
    }
  }, id)
})











router.get('/excel_download', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  sql_function.get_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      let temp;
      const list = [
        {
          name: "sheet", // 
          data: [
            ["Name", "Phone", "Email", "QQ", "Address", "Favorate"]
          ],
        },

      ];

      for (let i = 0; i < results.length; i++) {


        list[0].data.push([results[i].name, results[i].phone, results[i].email, results[i].qq, results[i].address, results[i].favorate])
      }

      const buffer = xlsx.build(list);
      let url = path.join(__dirname, "../download.xlsx")
      fs.writeFile(url, buffer, function (err) {
        if (err) {
          console.log(err, "导出excel失败");
        } else {
          console.log("导出excel成功!");
          console.log(process.cwd());
        }
      });
    }
  })


}),
  router.get('/excel_upload', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let url = path.join(__dirname, "../upload.xlsx")
    let sheets = xlsx.parse(url);
    console.log('数据格式为：', sheets);
    let arr = [];
    sheets.forEach((sheet) => {
      for (let i = 1; i < sheet['data'].length; i++) {
        let row = sheet['data'][i];
        if (row && row.length > 0) {
          let arr = {
            name: row[0],
            phone: row[1],
            email: row[2],
            qq: row[3],
            address: row[4],
            favorate: row[5],
          }
          console.log(arr)
          sql_function.post_sql((err, results) => {
            if (err) {
              console.error('Error fetching data')
            }
            else {
              console.log("存储成功")
              console.log('-------------------------------------')
            }
          }, arr)

        }
      }
      // console.log('读取的数据', arr)
    });
    res.send(results)
  })



module.exports = router
