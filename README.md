# 第一次快速编程

##环境
```
此项目前端使用vue后端使用node.js，请安装并且配置node.js环境 
```

##安装包
```
所需安装的包存储于pakage.json中，请在该文件夹目录终端输入 npm install 来安装express,mysql2和node-xlsx
```

##前端
```
前端文件夹为font-end文件夹，里面包含 index.html ,script.js,favorate.svg 
```

##后端
```
后端文件夹为back-end文件夹，里面包含 script.js , mysql.js , get_message.js ,download.xlsx,upload.xlsx
```

##使用前要做的调整
```
请提前创建一个名叫testout，包含ID,name,phone,email,qq,address,favorate属性的mysql表包含ID,name,age,phone,gender,time属性的mysql表。
并且将ID属性定为PK,NN,UQ,AI。favorate属性定为UN，ZF。name和phone定为NN。并且于 mysql.js 文件开头备注区域填入该数据库表所在的数据库名称，mysql用户名与mysql密码
```

##导入和导出功能
```
点击导出按键后，会将数据库中的数据导出，通过node-xlsx组件，在back-end同级目录形成download.xlsx文件。
点击导入按键后，会将back-end同级目录中的upload.xlsx文件的数据导入到数据库中。upload.xlsx文件的列分别为Name	Phone	Email	QQ	Address	Favorate，数据从第二行开始导入进数据库中

```
