import handler from './libs/handler-lib';
import AWS from "aws-sdk";

const cognitoidentityserviceprovider  = new AWS.CognitoIdentityServiceProvider();

export const main = handler(async (event, context) => {
    console.log(process.env.userPoolId);
    const params = {
        UserPoolId: process.env.userPoolId
    };
    const result = await cognitoidentityserviceprovider.listUsers(params);
    if ( ! result.Users ) {
        throw new Error('Users not found.');
    }
    return result.Users;
});