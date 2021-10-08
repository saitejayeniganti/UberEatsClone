exports.insertCustomer =
  "insert into Customer (email_id,mobile,password) values (?,?,?)";

exports.updateCustomer =
  "update Customer set name=?,email_id=?,mobile=?,city=?,state=?,country=?,nick_name=?,about=?,image_url=?, address=?,latitude=?,longitude=? where id=?";

exports.loginCustomer =
  "select Customer.id,Customer.name from Customer where email_id=? and password=?";

exports.insertOrder =
  "insert into Orders (customer_id,restaurent_id,price,order_date,delivery_type,order_status) values (?,?,?,NOW(),?,?)";

exports.updateOrder =
  "update Orders set customer_id=?,restaurent_id=?,price=?,order_date=?,delivery_type=?,order_status=? where id=?";

exports.updateOrderStatus = "update Orders set order_status=? where id=?";

exports.getOrdersForCustomer =
  "select Orders.id, Orders.customer_id,Orders.restaurent_id,Orders.price,Orders.order_date,Orders.delivery_type,Orders.order_status,Restaurents.name as restaurant_name,Restaurents.location,Order_items.dish_id,Order_items.quantity,Dishes.name,Dishes.price as dish_price from Orders inner join Restaurents on Orders.restaurent_id=Restaurents.id inner join Order_items on Orders.id=Order_items.order_id inner join Dishes on Order_items.dish_id=Dishes.id where Orders.customer_id=?";

exports.getCustomerByUsername =
  "select * from Customer where email_id=? or mobile=?";

exports.getCustomerByID = "select * from Customer where id=?";

exports.getFavoritesForCustomer = `SELECT Restaurents.id,name,email_id,password,location,suite,delivery_type,contact, 
star_time,end_time,image_url,latitude,longitude,Favorites.id as favorite, (6371 * acos( cos( radians(?) ) * 
cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) )) ) 
as distance from Restaurents left join Favorites on Restaurents.id=Favorites.restaurent_id 
where   Favorites.customer_id=?
order by distance asc`;

exports.makeFavoriteCustomer =
  "insert into Favorites (customer_id,restaurent_id) values (?,?)";

exports.makeUnFavoriteCustomer =
  "delete from  Favorites  where customer_id=? and restaurent_id=?";
