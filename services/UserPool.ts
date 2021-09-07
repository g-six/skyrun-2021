import {
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import getConfig from 'next/config'

async function signUp(data: Record<string, string>) {
    const { COGNITO_CLIENT_ID: client_id, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    const {
        email,
        password,
        given_name,
        family_name,
    } = data
    const config: CognitoIdentityProviderClientConfig = {
        region,
    }
    const client = new CognitoIdentityProviderClient(config)
    const command = new SignUpCommand({
        ClientId: client_id,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'given_name', Value: given_name },
            { Name: 'family_name', Value: family_name },
            { Name: 'custom:user_type', Value: 'TENANT' },
        ]
    })
    return await client.send(command)
}

export default signUp