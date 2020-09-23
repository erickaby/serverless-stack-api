import handler from './libs/handler-lib';
import AWS from "aws-sdk";

const cognitoidentityserviceprovider  = new AWS.CognitoIdentityServiceProvider();

export const main = handler(async (event, context) => {
    const params = {
        UserPoolId: process.env.userPoolId,
        Username: event.pathParameters.username
    };

    return await Promise.all([
            cognitoidentityserviceprovider.adminGetUser(params).promise(),
            cognitoidentityserviceprovider.adminListGroupsForUser(params).promise()
        ])
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err) {
                throw new Error(`Error getting user ${event.pathParameters.username}.`);
            }
        });
});