import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

async function login(data: Record<string, string>) {
    const {
        region,
        ClientId,
        email,
        password,
    } = data
    const config: CognitoIdentityProviderClientConfig = {
        region,
    }
    const client = new CognitoIdentityProviderClient(config)
    const command = new InitiateAuthCommand({
        ClientId,
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