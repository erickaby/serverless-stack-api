// import handler from './libs/handler-lib';
// // import * as uuid from 'uuid';
// import AWS from "aws-sdk";

// const cognitoidentityserviceprovider  = new AWS.CognitoIdentityServiceProvider();
// const iam = new AWS.IAM();

// export const main = handler(async (event, context) => {
//     const data = JSON.parse(event.body);

//     const iamRoleParams = {
//         AssumeRolePolicyDocument: ""
//     }

//     const params = {
//         UserPoolId: process.env.userPoolId,
//         GroupName: data.groupName,
//         Description: data.description,

//     };



//     return await cognitoidentityserviceprovider.adminCreateUser(params).promise()
//         .then((res) => {
//             return res;
//         })
//         .catch((err) => {
//             console.log(err);
//             if (err) {
//                 throw new Error(`Error creating user.`);
//             }
//         });
// });