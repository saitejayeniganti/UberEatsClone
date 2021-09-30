exports.insertRestaurant =
  "insert into Restaurents (name,email_id,password,location,suite,latitude,longitude) values (?,?,?,?,?,?,?)";

exports.insertDish =
  "insert into Dishes (restaurent_id,name,category,cuisine,price,main_ingredients,description,type,image_url) values (?,?,?,?,?,?,?,?,?)";

exports.updateRestaurant =
  "update Restaurents set name=?,location=?,delivery_type=?,contact=?,star_time=?,end_time=?,suite=?,image_url=? where id=?";

exports.loginRestaurant =
  "select Restaurents.id,Restaurents.name,location,suite,email_id,password,image_url,star_time,end_time from Restaurents where email_id=? and password=?";

exports.getDishes =
  "select Dishes.restaurent_id,Dishes.name,Dishes.category,Dishes.cuisine,Dishes.price,Dishes.main_ingredients,Dishes.description,Dishes.type,Dishes.id,Dishes.image_url from Dishes where restaurent_id=?";

exports.getOrdersForRestaurant = "select * from Orders where restaurent_id=?";

exports.getRestaurantByUsername =
  "select Restaurents.id,Restaurents.name,location,suite,email_id,password,image_url,star_time,end_time,password from Restaurents where email_id=?";

exports.getRestaurantByID =
  "select Restaurents.id,Restaurents.name,location,suite,email_id,password,image_url,star_time,end_time,password from Restaurents where id=?";

exports.getRestaurantsByLocation =
  "SELECT id,name,email_id,password,location,suite,delivery_type,contact,star_time,end_time,image_url,latitude,longitude, (6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) )) ) as distance from Restaurents order by distance asc";
