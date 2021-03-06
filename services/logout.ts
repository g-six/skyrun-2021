import { CognitoIdentityProviderClient, RevokeTokenCommand, RevokeTokenCommandInput, RevokeTokenCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import { CredentialProvider } from '@aws-sdk/types'
import getConfig from 'next/config'
import Cookies from 'js-cookie'

async function logout() {
    const { COGNITO_CLIENT_ID: ClientId, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    const input: RevokeTokenCommandInput = {
        Token: Cookies.get('refresh_token'),
        ClientId,
    }
    const command = new RevokeTokenCommand(input)
    try {
        const credentials: CredentialProvider = () => Promise.resolve({ accessKeyId: ClientId, secretAccessKey: 'asdasdsd' } as any)
        const client = new CognitoIdentityProviderClient({
            region,
            credentials,
        })

        // Logout
        const res: RevokeTokenCommandOutput = await client.send(command)
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        Cookies.remove('id_token')
        Cookies.remove('email')
        Cookies.remove('tenant_id')
        
    } catch (e) {
        console.error(e)
    }
}

export default logout