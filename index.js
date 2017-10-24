const AWS = require('aws-sdk');

AWS.config.update({region: "us-west-2"});
var client = new AWS.Lambda({region: "us-west-2"});

exports.getConfigKey = (key, callback) => {
  let reqPayload = {
    key: key
  };
  const env = process.env.MERCADONI_API_ENV;
  if (env) {
    reqPayload.env = env;
  }

  let reqParams = {
    FunctionName: "remote-config",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify(reqPayload)
  };
  client.invoke(reqParams, (err, data) => {
    if (err) {
      callback(err);
    }
    else {
      const response = JSON.parse(data.Payload);
      callback(null, response.value);
    }
  });
};
