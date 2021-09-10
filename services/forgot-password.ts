import {
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    ConfirmForgotPasswordCommand,
    ConfirmForgotPasswordCommandInput,
    ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import getConfig from 'next/config'

async function forgotPassword(data: Record<string, string>) {
    const { COGNITO_CLIENT_ID: client_id, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    const config: CognitoIdentityProviderClientConfig = {
        region,
    }
    const client = new CognitoIdentityProviderClient(config)
    const command = new ForgotPasswordCommand({
        ClientId: client_id,
        Username: data.email,
    })
    return await client.send(command)
}

export async function confirmForgotPassword(email: string, new_password: string, code: string) {
    const { COGNITO_CLIENT_ID: client_id, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    const config: CognitoIdentityProviderClientConfig = {
        region,
    }
    const input: ConfirmForgotPasswordCommandInput = {
        ClientId: client_id,
        Username: email,
        ConfirmationCode: code,
        Password: new_password,
    }
    const client = new CognitoIdentityProviderClient(config)
    const command = new ConfirmForgotPasswordCommand(input)

    return await client.send(command)
}

export default forgotPassword