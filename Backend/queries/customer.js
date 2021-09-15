exports.insertCustomer =
  "insert into Customer (name,email_id,password) values (?,?,?)";

exports.updateCustomer =
  "update Customer set name=?,email_id=?,password=?,city=?,state=?,country=?,nick_name=?,about=?,image_url=? where id=?";

exports.loginCustomer =
  "select Customer.id,Customer.name from Customer where email_id=? and password=?";

exports.insertOrder =
  "insert into Orders (customer_id,restaurent_id,price,order_date,delivery_type,order_status) values (?,?,?,?,?,?)";

exports.updateOrder =
  "update Orders set customer_id=?,restaurent_id=?,price=?,order_date=?,delivery_type=?,order_status=? where id=?";
