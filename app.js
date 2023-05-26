const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ region: "eu-west-1" });

const handler = async (event, context) => {
  try {
    //process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = 1;
    console.log(
      "Env variable:",
      process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED
    );
    const item = {
      TableName: "ecs-test-cmk-kms",
      Item: {
        pk: { S: "test1" },
        sk: { S: "test1" },
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
