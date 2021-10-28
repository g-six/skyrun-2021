import { AttributeType, CognitoIdentityProviderClient, GetUserCommand, GetUserCommandInput, GetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider'
import getConfig from 'next/config'
import Cookies from 'js-cookie'
import { CognitoErrorTypes } from './CognitoErrorTypes'
import refreshToken from './use-refresh-token'

export interface UserModel {
    uuid: string
    email: string
    given_name: string
    family_name: string
}
type ServiceError = {
    name: CognitoErrorTypes
}

async function getUserByAccessToken(AccessToken: string) {
    const { COGNITO_CLIENT_ID: ClientId, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    const input: GetUserCommandInput = {
        AccessToken: Cookies.get('access_token'),
    }
    const command = new GetUserCommand(input)
    const client = new CognitoIdentityProviderClient({
        region,
    })
    
    const results: GetUserCommandOutput = await client.send(command)
    if (results.Username) {
        const {
            Username,
            UserAttributes,
        } = results

        return {
            uuid: Username,
            given_name: UserAttributes?.find((attribute: AttributeType) => attribute.Name === 'given_name')?.Value as string,
            family_name: UserAttributes?.find((attribute: AttributeType) => attribute.Name === 'family_name')?.Value as string,
            email: UserAttributes?.find((attribute: AttributeType) => attribute.Name === 'email')?.Value as string,
        }
    }
}
async function profile() {
    const { COGNITO_CLIENT_ID: ClientId, COGNITO_REGION: region } = getConfig().publicRuntimeConfig
    if (!Cookies.get('access_token')) {
        const tokens = await refreshToken({ region, ClientId })
        if (tokens?.AuthenticationResult) {
            Cookies.set('access_token', tokens?.AuthenticationResult.AccessToken as string)
            Cookies.set('id_token', tokens?.AuthenticationResult.IdToken as string)
        } else {
            return false
        }
    }

    const input: GetUserCommandInput = {
        AccessToken: Cookies.get('access_token'),
    }
    let user: UserModel = false as unknown as UserModel

    if (Cookies.get('access_token')) {
        try {
            user = await getUserByAccessToken(Cookies.get('access_token') as string) as unknown as UserModel
        } catch (e) {
            const { name } = e as ServiceError
            console.log('error 56', e)
            if (name == CognitoErrorTypes.NotAuthorizedException) {
                Cookies.remove('access_token')
                Cookies.remove('id_token')
                const tokens = await refreshToken({ region, ClientId })
                if (tokens?.AuthenticationResult) {
                    Cookies.set('access_token', tokens?.AuthenticationResult.AccessToken as string)
                    Cookies.set('id_token', tokens?.AuthenticationResult.IdToken as string)
                    user = await getUserByAccessToken(tokens?.AuthenticationResult.AccessToken as string) as unknown as UserModel
                } else {
                    return false
                }
                return user as unknown as UserModel
            }
        }
    }
    return user as unknown as UserModel
}

export default profile