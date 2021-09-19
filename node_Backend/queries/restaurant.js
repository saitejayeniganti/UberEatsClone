exports.insertRestaurant =
  "insert into Restaurents (name,email_id,password,location,suite) values (?,?,?,?,?)";

exports.insertDish =
  "insert into Dishes (restaurent_id,name,category,cuisine,price,main_ingredients,description,type) values (?,?,?,?,?,?,?,?)";

exports.updateRestaurant =
  "update Restaurents set name=?, email_id=?,password=?,location=?,delivery_type=?,contact=?,star_time=?,end_time=? where id=?";

exports.loginRestaurant =
  "select Restaurents.id,Restaurents.name from Restaurents where email_id=? and password=?";

exports.getDishes =
  "select Dishes.restaurent_id,Dishes.name,Dishes.category,Dishes.cuisine,Dishes.price,Dishes.main_ingredients,Dishes.description,Dishes.type from Dishes where restaurent_id=?";

exports.getOrdersForRestaurant = "select * from Orders where restaurent_id=?";
