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

exports.getOrdersForRestaurant =
  "select Orders.id,Orders.customer_id,Orders.restaurent_id,Orders.price,Dishes.price as dish_price,Dishes.name as dish_name, Orders.order_date,Orders.delivery_type,Orders.order_status,Customer.name,Customer.email_id,Customer.address,Order_items.dish_id,Order_items.quantity from Orders inner join Customer on Customer.id=Orders.Customer_id inner join Order_items on Orders.id=Order_items.order_id inner join Dishes on Order_items.dish_id=Dishes.id where Orders.restaurent_id=? order by FIELD(Orders.order_status,'Placed','Confirmed','ReadyToBePicked','Delivered' ), Orders.order_date desc";

exports.getRestaurantByUsername =
  "select Restaurents.id,Restaurents.name,location,suite,email_id,password,image_url,star_time,end_time,password from Restaurents where email_id=?";

exports.getRestaurantByID =
  "select Restaurents.id,Restaurents.name,location,suite,email_id,password,image_url,star_time,end_time,password from Restaurents where id=?";

exports.getRestaurantsByLocation = `SELECT Restaurents.id,Restaurents.name,email_id,password,location,suite,delivery_type,contact, 
star_time,end_time,Restaurents.image_url,latitude,longitude,Favorites.id as favorite, (6371 * acos( cos( radians(?) ) * 
cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) )) ) 
as distance from Restaurents left join Favorites on Restaurents.id=Favorites.restaurent_id 
where (  Favorites.customer_id=? ||  Favorites.customer_id is null ) 
and Restaurents.id in (select restaurent_id from Dishes where ""=? or Dishes.type=?   ) 
and ( ""=? or Restaurents.delivery_type =?)
order by distance asc`;
