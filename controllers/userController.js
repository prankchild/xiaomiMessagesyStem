const { createConnection } = require("mysql");
const dbConfig = require("../util/DBConfig")

getUser=(req,res)=>{
    const sql = 'SELECT * FROM backstageuser';
    const sqlArr = [];
    const callBack =(err,data)=>{
    if(err){
        console.log("连接出错"+err);
    }else{
        res.send({
        'list':data
        })
    }
    }

    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
getUserId=(req,res)=>{
    let {user_id} = req.query;
    let sql = `SELECT * FROM backstageuser where user_id=?`;
    let sqlArr = [user_id];
    let callBack =(err,data)=>{
    if(err){
        console.log("连接出错"+err);
    }else{
        res.send({
        'list':data
        })
    }
    }

    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
// 随机生成32位token
function makeid(length){
    var result= '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
// //获取用户的详情
// let getUser = (username)=>{
//     let sql = `select  from backstageuser where username=?`;
//     let sqlArr = [username];
//     return dbConfig.SySqlConnect(sql,sqlArr);
// }
// 用户登录
let Login = (req,res)=>{
    let username = req.query.username;
    let password = req.query.password;
    // let sql = 'select * from backstageuser where username=? and password=?';
    console.log(req)
    let sql = 'select * from backstageuser where username=?';
    let sqlArr = [username];
    let String = makeid(32);
    let callBack = async (err,data)=>{
        if(err){
            console.log(err);
            res.send({
                status:400,
                msg:'出错了'
            });
        }else if(data.length == 0){
            res.send({
                status:400,
                msg:'用户名或者密码出错！'
            });
        }else{
            if(data[0].password == password){
                res.send({
                    status:200,
                    msg:'登录成功',
                    token:String
                });
                console.log(String);
            }else{
                res.send({
                    status:400,
                    msg:'用户名或者密码出错！'
                });
            }
        }
    }

    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
let register = (req,res)=>{
    let username = req.query.username;
    let password = req.query.password;
    let mobile = req.query.mobile;
    let sql = `insert into backstageuser(username,password,mobile) value(?,?,?)`;
    let sqlArr = [username,password,mobile];
    let callBack = async (err,data)=>{
        if(err){
            console.log(err);
            res.send({
                status:400,
                msg:'注册用户失败'
            });
        }else if(data.length == 0){
            res.send({
                status:400,
                msg:'注册用户失败'
            });
        }else{
                res.send({
                    status:200,
                    msg:'注册用户成功'
                });
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    getUser,getUserId,Login,register
}