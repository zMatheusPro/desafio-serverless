import { document } from '../utils/dynamodbClient';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { v4 as uuidV4 } from 'uuid'

interface ICreateToDo {
    title: string;
    deadline: string;
}

export const handle: APIGatewayProxyHandler = async event => {
    // user_id, title, deadline = 
    const { user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateToDo;

    await document.put({
        TableName: "users_todos",
        Item: {
            id: uuidV4(),
            user_id,
            done: false,
            title,
            deadline: new Date(deadline).getTime()
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "todo created successfully!"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    };
};