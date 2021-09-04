import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import getConfig from 'next/config'

export interface LoginModel {
    email: string
    password: string
}

async function login(
    { email, password }: LoginModel
) {
    const { COGNITO_CLIENT_ID: client_id, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    const client = new CognitoIdentityProviderClient({ region } as CognitoIdentityProviderClientConfig)
    const command = new InitiateAuthCommand({
        ClientId: client_id,
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        }
    })
    const res = await client.send(command)
    return res
}

export default login