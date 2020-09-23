import handler from './libs/handler-lib';
import AWS from "aws-sdk";

const cognitoidentityserviceprovider  = new AWS.CognitoIdentityServiceProvider();

export const main = handler(async (event, context) => {
    console.log(process.env.userPoolId);
    const params = {
        UserPoolId: process.env.userPoolId
    };
    return await cognitoidentityserviceprovider.listGroups(params).promise()
        .then((res) => {
            return res.Groups;
        })
        .catch((err) => {
            if (err) {
                throw new Error('Error getting group list.');
            }
        });
});