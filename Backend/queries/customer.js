exports.insertCustomer =
  "insert into Customer (name,email_id,password) values (?,?,?)";

exports.updateCustomer =
  "update Customer set name=?,email_id=?,password=?,city=?,state=?,country=?,nick_name=?,about=?,image_url=? where id=?";
