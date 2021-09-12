import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
const mockEnvConfig = {}

jest.mock('next/config', () => () => ({ publicRuntimeConfig: mockEnvConfig }))
configure({ adapter: new Adapter() })