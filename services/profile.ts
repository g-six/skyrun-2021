import { AttributeType, CognitoIdentityProviderClient, CognitoIdentityProviderClientConfig, GetUserCommand, GetUserCommandInput, GetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import Cookies from 'js-cookie'
import { CognitoErrorTypes } from './CognitoErrorTypes'
import refreshToken from './use-refresh-token'

export interface UserModel {
    uuid: string
    given_name: string
    family_name: string
}

async function profile(region = 'us-east-1', ClientId = '') {
    if (!Cookies.get('access_token')) {
        const tokens = await refreshToken({ region, ClientId })
        if (tokens?.AuthenticationResult) {
            Cookies.set('access_token', tokens?.AuthenticationResult.AccessToken as string)
        }
    }
    const input: GetUserCommandInput = {
        AccessToken: Cookies.get('access_token'),
    }
    let user: UserModel = false as unknown as UserModel

    if (input.AccessToken) {
        const command = new GetUserCommand(input)
        try {
            const client = new CognitoIdentityProviderClient({
                region,
            })
            
            const results: GetUserCommandOutput = await client.send(command)
            if (results.Username) {
                const {
                    Username,
                    UserAttributes,
                } = results

                user = {
                    uuid: Username,
                    given_name: UserAttributes?.find((attribute: AttributeType) => attribute.Name === 'given_name')?.Value as string,
                    family_name: UserAttributes?.find((attribute: AttributeType) => attribute.Name === 'family_name')?.Value as string,
                }
            }
        } catch (e) {
            if (e.name == CognitoErrorTypes.NotAuthorizedException) {
                Cookies.remove('access_token')
                return user as unknown as UserModel
            }
            console.error(e)
        }
    }
    return user as unknown as UserModel
}

export default profile