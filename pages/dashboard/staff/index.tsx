import Dashboard from '..'

export interface DashboardPageProps {
    region: string
    ClientId: string
}

function DashboardStaff(props: DashboardPageProps) {
    return <Dashboard {...props}>
        <span>Staff panel is a work in progress</span>
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

export default DashboardStaff
