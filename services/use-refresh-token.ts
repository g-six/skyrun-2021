import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import Cookies from 'js-cookie'

async function refreshToken(data: Record<string, string>) {
    if (!Cookies.get('refresh_token')) return
    const {
        region,
        ClientId,
    } = data
    const config: CognitoIdentityProviderClientConfig = {
        region,
    }
    const client = new CognitoIdentityProviderClient(config)
    const command = new InitiateAuthCommand({
        ClientId,
        AuthFlow: AuthFlowType.REFRESH_TOKEN,
        AuthParameters: {
            REFRESH_TOKEN: Cookies.get('refresh_token') as string,
        }
    })
    const res = await client.send(command)
    return res
}

export default refreshToken