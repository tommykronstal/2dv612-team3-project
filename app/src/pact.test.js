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
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIyOSIsImVtYWlsIjoidXNlcjI5QHVzZXIuY29tIiwicm9sZSI6IlVTRVIifQ.w2_IERnUUMbnSeGHSjNv0CMIEC-YSA4UMksRXdv5g-8'
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
              "_id": "5a37b83d127003001cc27fec",
              "title": "How to configure the flux capasitor in a Samsung 420? thread 0 . 0",
              "creator": "5a37b82c127003001cc27e5f",
              "category": "5a37b82c127003001cc27df5",
              "date": "2017-12-18T12:44:45.028Z",
              "posts": []
            }
          )
        }
      })
    )
    
    it('returns a forum thread', async () => {
      const result = await get(PACT_HOST + '/api/forum/thread', {headers: headers})
    
      const expected = [
        {
          "_id": "5a37b83d127003001cc27fec",
          "title": "How to configure the flux capasitor in a Samsung 420? thread 0 . 0",
          "creator": "5a37b82c127003001cc27e5f",
          "category": "5a37b82c127003001cc27df5",
          "date": "2017-12-18T12:44:45.028Z",
          "posts": []
        }
      ]

      expected.status = 200

      expect(result).toEqual(expected)
    })

    it('successfully verifies', () => provider.verify())
  })


})
