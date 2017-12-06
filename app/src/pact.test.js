import Pact, {Matchers} from 'pact'
import path from 'path'
import {get} from './lib/http'
import {post} from './lib/http'
import {getPayloadFromJwtToken} from './lib/jwt';

describe('set up pact', () => {
  const PACT_SERVER_PORT = 4000
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


  // LOGIN TESTS

  describe('admin can login in', () => {
    const expected = {
      error: false,
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4ubnUiLCJyb2xlIjoiQURNSU4ifQ.jcQEXVDj3HZADGaLRRCAIRpLr7anqmWY-J6Ms9yUdgE'
    }
    beforeAll(() => provider.addInteraction({
      uponReceiving: 'login request with admin login',
      withRequest: {
        method: 'POST',
        path: '/api/user/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { 'email': 'admin@admin.nu', 'password': 'admin' }
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: {
          error: false,
          token: Matchers.somethingLike('eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4ubnUiLCJyb2xlIjoiQURNSU4ifQ.jcQEXVDj3HZADGaLRRCAIRpLr7anqmWY-J6Ms9yUdgE')
        }
      }
    })
    )

    it('returns a matching token', async () => {
      const result = await post(PACT_HOST + '/api/user/login', {headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({email: 'admin@admin.nu', password: 'admin'})})

      expect(result).toEqual({...expected, status: 200})
    })

    it('successfully verifies', () => provider.verify())
  })

  describe('company rep can login in', () => {
    const expected = { error: false, token: "eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTlNhbXN1bmdSZXAwIiwiZW1haWwiOiJyZXAwQHNhbXN1bmcuY29tIiwicm9sZSI6IkNPTVBBTllfUkVQIiwiY29tcGFueUlkIjoiNWEyN2VmYjA1ZGY1ODkzODdjZTY3ZTlhIn0.9yhfCalyanbjmZKwsBfHiCxvhHn5qIv2SuDNvM7D69s" }
    beforeAll(() => provider.addInteraction({
        uponReceiving: 'login request with company rep login',
        withRequest: {
          method: 'POST',
          path: '/api/user/login',
          headers: { 'Content-Type': 'application/json' },
          body: { 'email': 'rep0@samsung.com', 'password': 'password' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {
            error: false,
            token: Matchers.somethingLike('eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTlNhbXN1bmdSZXAwIiwiZW1haWwiOiJyZXAwQHNhbXN1bmcuY29tIiwicm9sZSI6IkNPTVBBTllfUkVQIiwiY29tcGFueUlkIjoiNWEyN2VmYjA1ZGY1ODkzODdjZTY3ZTlhIn0.9yhfCalyanbjmZKwsBfHiCxvhHn5qIv2SuDNvM7D69s')
          }
        }
      })
    )

    it('returns a matching token', async () => {
      const result = await post(PACT_HOST + '/api/user/login', {headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({email: 'rep0@samsung.com', password: "password"})})

      expect(result).toEqual({...expected, status: 200})
    })

  })

  describe('user can login in', () => {
    const expected = { error: false, token: "eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIyOSIsImVtYWlsIjoidXNlcjI5QHVzZXIuY29tIiwicm9sZSI6IlVTRVIifQ.w2_IERnUUMbnSeGHSjNv0CMIEC-YSA4UMksRXdv5g-8" }
    beforeAll(() => provider.addInteraction({
        uponReceiving: 'login request with regular user login',
        withRequest: {
          method: 'POST',
          path: '/api/user/login',
          headers: { 'Content-Type': 'application/json' },
          body: { 'email': 'user29@user.com', 'password': 'password' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {
            error: false,
            token: Matchers.somethingLike('eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIyOSIsImVtYWlsIjoidXNlcjI5QHVzZXIuY29tIiwicm9sZSI6IlVTRVIifQ.w2_IERnUUMbnSeGHSjNv0CMIEC-YSA4UMksRXdv5g-8')
          }
        }
      })
    )

    it('returns a matching token', async () => {
      const result = await post(PACT_HOST + '/api/user/login', {headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({email: 'user29@user.com', password: "password"})})

      expect(result).toEqual({...expected, status: 200})
    })
  })


// TEST 2 START
  describe('returns all products', () => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIyOSIsImVtYWlsIjoidXNlcjI5QHVzZXIuY29tIiwicm9sZSI6IlVTRVIifQ.w2_IERnUUMbnSeGHSjNv0CMIEC-YSA4UMksRXdv5g-8'
    }

    beforeAll(() => provider.addInteraction({
        uponReceiving: 'a request for getting products',
        withRequest: {
          method: 'GET',
          path: '/api/product',
          headers
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: Matchers.eachLike({
            "_id": "5a280388169758001ce1fd6b",
            "name": "Samsung Mobile Phone 0",
            "category": "5a280387169758001ce1fd5f",
            "rating": [],
            "materials": ["5a280388169758001ce1fd69"]
          })
        }
      })
    )

    it('returns a list of events', async () => {
      const result = await get(PACT_HOST + '/api/product', {headers})

      const expected = [
        {
          "_id": "5a280388169758001ce1fd6b",
          "name": "Samsung Mobile Phone 0",
          "category": "5a280387169758001ce1fd5f",
          "rating": [],
          "materials": ["5a280388169758001ce1fd69"]
        }
      ]

      expected.status = 200 // fix for ugly mapping of response status

      expect(result).toEqual(expected)
    })
    it('successfully verifies', () => provider.verify())
  })
// TEST 2 END

  describe('returns an error if no token in header on auth route', () => {
    const expected = {message: 'There was no token in the header', error: true }
    beforeAll(() => provider.addInteraction({
        uponReceiving: 'a request without auth header on authed route',
        withRequest: {
          method: 'GET',
          path: '/api/user/products',
          headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 401,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: expected
        }
      })
    )

    it('returns an error', async () => {
      const result = await get(PACT_HOST + '/api/user/products', {headers: { 'Accept': 'application/json' }})

      expect(result).toEqual({...expected, status: 401})

    })
  })

  describe('Return a rating', () => {
      const headers = {
          'Accept': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIyOSIsImVtYWlsIjoidXNlcjI5QHVzZXIuY29tIiwicm9sZSI6IlVTRVIifQ.w2_IERnUUMbnSeGHSjNv0CMIEC-YSA4UMksRXdv5g-8'
      };

      beforeAll(() => provider.addInteraction({
              uponReceiving: 'a request for getting a rating',
              withRequest: {
                  method: 'GET',
                  path: '/api/product/material/5a280388169758001ce1fd69/rating',
                  headers: { 'Accept': 'application/json' }
              },
              willRespondWith: {
                  status: 200,
                  headers: { 'Content-Type': 'application/json; charset=utf-8' },
                  body: Matchers.eachLike({
                      "_id": "5a280388169758001ce1fd6b",
                      "name": "Samsung Mobile Phone 0",
                      "category": "5a280387169758001ce1fd5f",
                      "rating": [],
                      "materials": ["5a280388169758001ce1fd69"]
                  })
              }
      })
      );

      it('returns a list of ratings', async () => {
          const result = await get(PACT_HOST + '/api/product/material/5a280388169758001ce1fd69/rating', {headers});

          const expected = [
              {
                  "_id": "5a280388169758001ce1fd6b",
                  "name": "Samsung Mobile Phone 0",
                  "category": "5a280387169758001ce1fd5f",
                  "rating": [],
                  "materials": ["5a280388169758001ce1fd69"]
              }
          ];

          expected.status = 200; // fix for ugly mapping of response status

          expect(result).toEqual(expected)
      });
      it('successfully verifies', () => provider.verify())
  })

})