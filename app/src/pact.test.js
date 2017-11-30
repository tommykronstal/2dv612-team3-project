import Pact from 'pact'
import path from 'path'
import {get} from './lib/http'


describe('set up pact', () => {
  const PACT_SERVER_PORT = 12400
  const PACT_SPECIFICATION_VERSION = 2
  const PACT_HOST = 'http://localhost:' + PACT_SERVER_PORT

  const provider = Pact({
    consumer: 'Frontend',
    provider: 'Backend',
    port: PACT_SERVER_PORT,
    spec: PACT_SPECIFICATION_VERSION,
    log: path.resolve(process.cwd(), './__pacts__/logs', 'pact-integration.log'),
    dir: path.resolve(process.cwd(), './__pacts__/pacts')
  })

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())

  describe('returns a welcome message', () => {

    beforeAll(() => provider.addInteraction({
        uponReceiving: 'a request for getting welcome message',
        withRequest: {
          method: 'GET',
          path: '/api',
          headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {message: 'Welcome to backend API!'}
        }
      })
    )
    
    it('returns a list of events', async () => {
      const result = await get(PACT_HOST + '/api', {headers: { 'Accept': 'application/json' }})
    
      expect(result).toEqual({message: 'Welcome to backend API!', status: 200})
    })

    it('successfully verifies', () => provider.verify())
  })

})
