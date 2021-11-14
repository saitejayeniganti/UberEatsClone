var connection = new require("./kafka/Connection");

var customer = require("./services/customer");
var order = require("./services/order");

async function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  await consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    let res = await fname.handle_request(data.data);
    var payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: res,
        }),
        partition: 0,
      },
    ];
    await producer.send(payloads, async function (err, data) {
      console.log(data);
    });
    return;
  });
}
handleTopicRequest("updatecustomer", customer);
handleTopicRequest("updateorder", order);
