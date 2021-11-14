exports.updateCustomer =
  "update Customer set name=?,email_id=?,mobile=?,city=?,state=?,country=?,nick_name=?,about=?,image_url=?, address=?,latitude=?,longitude=? where id=?";

exports.updateOrderStatus =
  "update Orders set order_status=?,instructions=? where id=?";
