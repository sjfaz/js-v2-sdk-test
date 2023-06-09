const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB({ region: "eu-west-1" });

const handler = async (event, context) => {
  try {
    // process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = 1;
    console.log(
      "Env variable:",
      process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED
    );
    const item = {
      TableName: "sdk-test",
      Item: {
        pk: { S: "test-sk-1" },
        sk: { S: "test-pk-1" },
      },
    };

    // Loop DDB PutItem every 10 seconds for 5 minutes
    for (let i = 0; i < 30; i++) {
      const response = await dynamodb.putItem(item).promise();
      console.log("Response Headers:", response.$response.httpResponse.headers);
      console.log("Response Body:", response);
      await sleep(10000);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Finished test...",
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

handler().then((res) => console.log(res));
