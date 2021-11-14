exports.updateCustomer =
  "update Customer set name=?,email_id=?,mobile=?,city=?,state=?,country=?,nick_name=?,about=?,image_url=?, address=?,latitude=?,longitude=? where id=?";

exports.updateOrder =
  "update Orders set customer_id=?,restaurent_id=?,price=?,order_date=?,delivery_type=?,order_status=? where id=?";
