exports.insertRestaurant =
  "insert into Restaurents (name,email_id,password,location) values (?,?,?,?)";

exports.insertDish =
  "insert into Dishes (restaurent_id,name,category,cuisine,price,main_ingredients,description,type) values (?,?,?,?,?,?,?,?)";

exports.updateRestaurant =
  "update Restaurents set name=?, email_id=?,password=?,location=?,delivery_type=?,contact=?,star_time=?,end_time=? where id=?";

exports.loginRestaurant =
  "select Restaurents.id,Restaurents.name from Restaurents where email_id=? and password=?";
