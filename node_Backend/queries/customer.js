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

exports.getOrdersForCustomer = "select * from Orders where customer_id=?";

exports.getCustomerByUsername =
  "select * from Customer where email_id=? or mobile=?";

exports.getCustomerByID = "select * from Customer where id=?";
