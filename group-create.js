import handler from './libs/handler-lib';
// import * as uuid from 'uuid';
import AWS from "aws-sdk";

const cognitoidentityserviceprovider  = new AWS.CognitoIdentityServiceProvider();
const iam = new AWS.IAM();
// const sts = new AWS.STS();

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const createRoleParams = {
        AssumeRolePolicyDocument: JSON.stringify({
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        Federated: 'cognito-identity.amazonaws.com'
                    },
                    Action: [
                        'sts:AssumeRoleWithWebIdentity'
                    ]
                }
            ]
        }),
        Path: '/scratch/groups/',
        RoleName: data.name
    };

    // Create IAM Role
    return iam.createRole(createRoleParams).promise()
        .then((roleRes) => {
            // Create Cognito Group && Attach Role
            return cognitoidentityserviceprovider.createGroup({
                GroupName: data.name,
                UserPoolId: process.env.userPoolId,
                Precedence: data.precedence,
                RoleArn: roleRes.Role.Arn
            }).promise()
                .then((groupRes) => {
                    return { roleRes, groupRes };
                })
                .catch((err) => {
                    console.log(err);
                    if (err) {
                        throw new Error('Error creating group.');
                    }
                });
        })
        .catch((err) => {
            console.log(err);
            if (err) {
                throw new Error('Error creating role.');
            }
        });

    //https://aws.amazon.com/premiumsupport/knowledge-center/lambda-function-assume-iam-role/
});