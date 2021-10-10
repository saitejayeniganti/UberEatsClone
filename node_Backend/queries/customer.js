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

exports.getCart = `
select Orders.id as order_Id,Order_items.quantity as quantity,
Dishes.name as dishName,Order_items.restaurent_id as restaurantId,Dishes.id as dishId,Restaurents.name as restaurantName  from Orders 
  inner join Order_items on Orders.id=Order_items.order_id
  inner join Dishes on Dishes.id=Order_items.dish_id 
  inner join Restaurents on Restaurents.id=Dishes.restaurent_id
  where Orders.order_status="In cart" and Orders.customer_id=?
  `;

exports.findOrder = `
  select id from Orders where customer_id=44 and order_status="In cart"`;

exports.insertOrderItem = `insert into Order_items (order_id,customer_id,restaurent_id,dish_id,quantity) values (?,?,?,?,?) `;

exports.calculatePrice = `update Orders set price=( select sum(Dishes.price*quantity) from Order_items 
inner join Dishes on Order_items.dish_id=Dishes.id ) where Orders.id=?`;

exports.getCheckoutCart = `select Orders.id as order_Id,Order_items.quantity as quantity,Dishes.name as dishName,Order_items.restaurent_id as restaurantId,Dishes.id as dishId,Dishes.price as dishPrice,Orders.price as orderPrice,Restaurents.name as restaurantName from Orders inner join Order_items on Orders.id=Order_items.order_id inner join Dishes on Dishes.id=Order_items.dish_id inner join Restaurents on Restaurents.id=Dishes.restaurent_id where Orders.order_status="In cart" and Orders.customer_id=?`;

exports.checkOrderPresent = `select id from Order_items where order_id=? and dish_id=? `;

exports.updateOrderItem = `update Order_items set quantity=? where order_id=? and dish_id=?`;

exports.getAddress = `select location,latitude,longitude from Address where customer_id=? 
Union 
select address,latitude,longitude from Customer where id=?
`;

exports.addAddress = `insert into Address (customer_id,location,latitude,longitude) values (?,?,?,?) 
`;
