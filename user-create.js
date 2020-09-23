import handler from './libs/handler-lib';
// import * as uuid from 'uuid';
import AWS from "aws-sdk";

const cognitoidentityserviceprovider  = new AWS.CognitoIdentityServiceProvider();

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        UserPoolId: process.env.userPoolId,
        Username: data.email
    };

    return await cognitoidentityserviceprovider.adminCreateUser(params).promise()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            if (err) {
                throw new Error(`Error creating user.`);
            }
        });
});