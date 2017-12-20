import Pact, {Matchers} from 'pact'
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
    const expected = {message: 'Welcome to backend API!'}

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
          body: expected
        }
      })
    )
    
    it('returns a list of events', async () => {
      const result = await get(PACT_HOST + '/api', {headers: { 'Accept': 'application/json' }})
    
      expect(result).toEqual({...expected, status: 200})
    })

    it('successfully verifies', () => provider.verify())
  })

  // Forum
  describe('returns a forum thread', () => {
    
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIxIiwiZW1haWwiOiJ1c2VyMUB1c2VyLmNvbSIsInJvbGUiOiJVU0VSIiwidXNlcklkIjoiNWEzMjY1ZTM3YTdkNTUwMDFkOGEyZTZlIn0.ikrvRAg6kTZItYXzxC0CyBSrGXryxTp95QUvQI9nYGI'
  };

    beforeAll(() => provider.addInteraction({
        uponReceiving: 'returns a forum thread',
        withRequest: {
          method: 'GET',
          path: '/api/forum/thread',
          headers: headers
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: Matchers.eachLike(
            {
              "title": "How to configure the flux capasitor in a Samsung 420? thread 0 . 0",
              "date": "2017-12-18T12:44:45.028Z"
            }
          )
        }
      })
    )
    
    it('returns a forum thread', async () => {
      const result = await get(PACT_HOST + '/api/forum/thread', {headers: headers})
    
      const expected = [
        {
          "title": "How to configure the flux capasitor in a Samsung 420? thread 0 . 0",
          "date": "2017-12-18T12:44:45.028Z"
        }
      ]

      expected.status = 200

      expect(result).toEqual(expected)
    })

    it('successfully verifies', () => provider.verify())
  })

})
