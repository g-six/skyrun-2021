import { CognitoIdentityProviderClient, CognitoIdentityProviderClientConfig, GetUserCommand, GetUserCommandInput, GetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import Cookies from 'js-cookie'

async function profile(data: CognitoIdentityProviderClientConfig) {
    const {
        region,
    } = data

    const input: GetUserCommandInput = {
        AccessToken: Cookies.get('access_token'),
    }
    const command = new GetUserCommand(input)
    try {
        const client = new CognitoIdentityProviderClient({
            region,
        })
        const user_res: GetUserCommandOutput = await client.send(command)
    } catch (e) {
        console.error(e)
    }
}

export default profile