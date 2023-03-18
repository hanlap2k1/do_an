 
import Users from "../models/Users.js"
import mg from "../../util/mongoose.js"
import { render } from "node-sass";
export default class SiteController{
    home(req,res,next){
        res.render('home');
    }
    more(req,res,next){
        res.render('more');
    }
    search_home(req,res,next){
        Users.find()
            .then(users => {
                //teachers = teachers.map(teacher => teacher.toObject());
                users = mg.mutipleMongooseToOject(users);
                res.render('search', { users });
            })
            .catch(next);
    }
    searchlessons(req,res,next){
        Users.find({Giang_vien:req.body.ten, Ngay: { $in: req.body.check }})
            .then(users => {
                    //teachers = teachers.map(teacher => teacher.toObject());
                    var tiet = 0;
                    var dem = 0;
                    users = mg.mutipleMongooseToOject(users);
                    var users_tiet = users.map(function(user){
                        if(user.Ma_lop == 'FE6001' || user.Ma_lop == 'FE6067'){
                            dem = 2;
                        }
                        else{
                            dem = 6;
                        }
                        if(user.Phong_thu_2 !==null&&user.Ca_thu_2 !==null)
                            tiet = tiet + dem;
                        if(user.Phong_thu_3 !==null&&user.Ca_thu_3 !==null)
                            tiet = tiet + dem;
                        if(user.Phong_thu_4 !==null&&user.Ca_thu_4 !==null)
                            tiet = tiet + dem;
                        if(user.Phong_thu_5 !==null&&user.Ca_thu_5 !==null)
                            tiet = tiet + dem;
                        if(user.Phong_thu_6 !==null&&user.Ca_thu_6 !==null)
                            tiet = tiet + dem;
                        if(user.Phong_thu_7 !==null&&user.Ca_thu_7 !==null)
                            tiet = tiet + dem;
                        if(user.Phong_chu_nhat !==null&&user.Ca_chu_nhat !==null)
                            tiet = tiet + dem;
                    
                    });
                    res.render('search2', {
                        tiet,
                        users
                    });
            })
            .catch(next);
        
    }
};
