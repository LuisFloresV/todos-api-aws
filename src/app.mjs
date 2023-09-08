import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { nanoid } from 'nanoid'

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const lambdaHandler = async (event, context) => {
    const command = new PutCommand({
        TableName: "Todos",
        Item: {
            id: nanoid(),
            Variety: "Sample TODO",
        },
    });

    try {
        await docClient.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Todo created!', })
        }
    }
    catch (e) {
        if (e) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Something went wrong!', })
            }
        }
    }
};
