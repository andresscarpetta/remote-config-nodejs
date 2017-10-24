import * as AWS from 'aws-sdk';

AWS.config.update({region: "us-west-2"});
var client = new AWS.Lambda({region: "us-west-2"});

export function getConfigKey(key) {
  let payload = {
    key: key
  };
  const env = process.env.MERCADONI_API_ENV;
  if (env) {
    payload.env = env;
  }

  let reqParams = {
    FunctionName: "remote-config",
    InvocationType: RequestResponse,
    Payload: payload
  };
  client.invoke(reqParams, (err, data) => {
    if (err) {
      return err;
    }
    else {
      const response = JSON.parse(data.Payload);
      return response.value;
    }
  });
}
