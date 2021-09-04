import {
    CognitoIdentityProviderClient,
    CognitoIdentityProviderClientConfig,
    SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

async function signUp(data: Record<string, string>) {
    const {
        region,
        ClientId,
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
        ClientId,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'given_name', Value: given_name },
            { Name: 'family_name', Value: family_name },
            { Name: 'custom:user_type', Value: 'TENANT' },
        ]
    })
    const res = await client.send(command)
    return res
}

export default signUp