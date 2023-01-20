const aws = require('aws-sdk')

// initialise dynamoDB client
const dynamoDB = new aws.DynamoDB.DocumentClient({
  region: 'us-east-2',
  apiVersion: '2021-09-10',
})

exports.handler = async (event) => {
  try {
    console.log('event: ', event)

    // event has propety called "Records"
    const { Records } = event

    // parse the message into json object:
    const body = JSON.parse(Records[0].body)

    // logs the body which is message
    console.log('Incoming message body from SQS :', body)

    const params = {
      TableName: 'demoJob1',
      Item: {
        userId: body.userId,
        name: body.name,
        age: body.age,
      },
    }

    // write data to dynamo DB:
    await dynamoDB.put(params).promise()

    console.log('Successfully written to DynamoDB')
  } catch (error) {
    console.error('Error in executing lambda: ', error)
    return { statusCode: 500, 'message:': 'Error while execution' }
  }
}
