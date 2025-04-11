const amqp = require("amqplib");

let channel;

// Connect to RabbitMQ
async function connectRabbitMQ(retries = 5) {
  while (retries) {
    try {
      console.log("🔄 Trying to connect to RabbitMQ...");
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue("user_registered", { durable: true });
      console.log("✅ Connected to RabbitMQ");
      return;
    } catch (error) {
      console.error(`❌ RabbitMQ Connection Failed, retries left: ${retries - 1}`);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5s before retrying
    }
  }
  console.error("❌ RabbitMQ connection failed after multiple retries.");
  process.exit(1); // Exit if unable to connect
}

// Publish Message to RabbitMQ
function publishToQueue(queueName, message) {
  if (!channel) {
    console.error("❌ RabbitMQ Channel not available. Skipping event publish.");
    return;
  }
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  console.log(`📤 Message sent to queue "${queueName}":`, message);
}

module.exports = { connectRabbitMQ, publishToQueue };
