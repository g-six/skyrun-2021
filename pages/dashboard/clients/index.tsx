import Dashboard from '..'

export interface DashboardPageProps {
    region: string
    ClientId: string
}

function DashboardClient(props: DashboardPageProps) {
    return <Dashboard {...props}>
        <span>Work in progress</span>
    </Dashboard>
}

export async function getStaticProps() {
    return {
        props: {
            region: process.env.COGNITO_REGION,
            ClientId: process.env.COGNITO_CLIENT_ID,
        },
    }
}

export default DashboardClient
