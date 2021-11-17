import { isProdEnv } from "./environment-helper"

// TODO: Fix unit test
describe.skip('environment', () => {
  const original_env = process.env

  const setNodeEnv = (node_env: 'development' | 'production' | 'test') => {
    process.env = {
      ...original_env,
      NODE_ENV: node_env,
    }
  }

  afterAll(() => {
    process.env = original_env
  });

  describe('isProdEnv', () => {
    beforeEach(() => {
      jest.resetModules()
    })

    afterEach(() => {
      process.env = original_env
    });

    it('should return false', () => {
      setNodeEnv('test')
      expect(isProdEnv()).toEqual(false)
    })

    it('should return true', () => {
      setNodeEnv('production')
      expect(isProdEnv()).toEqual(true)
    })

    it('should reset to non-production env', () => {
      expect(isProdEnv()).toEqual(false)
    })
  })
})
