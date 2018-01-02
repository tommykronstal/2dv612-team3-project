import Pact, {Matchers} from 'pact'
import path from 'path'
import {get} from './lib/http'
import {post} from './lib/http'


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
          body: { 'email': 'rep@samsung.com', 'password': 'password' }
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
    /*
    // Testing Rating
    describe('Create a rating', () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJGTnVzZXIyOSIsImVtYWlsIjoidXNlcjI5QHVzZXIuY29tIiwicm9sZSI6IlVTRVIifQ.w2_IERnUUMbnSeGHSjNv0CMIEC-YSA4UMksRXdv5g-8'
        };
        
        beforeAll(() => provider.addInteraction({
                uponReceiving: 'a request for creating a rating',
                withRequest: {
                    method: 'POST',
                    path: '/api/product/material/5a2838e4407de3001da76d72/rating',
                    headers,
                    body: { 'rating': 4 }
                },
                willRespondWith: {
                    status: 201,
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: {
                        "_id": "5a2838e4407de3001da76d72",
                        "name": "manual",
                        "originalname": "components.pdf",
                        "filename": "e506a9172af9259843342dc44c58f763",
                        "path": "src/lib/seed/e506a9172af9259843342dc44c58f763",
                        "size": 33600,
                        "mimetype": "application/pdf",
                        "__v": 2,
                        "avgRating": 4,
                        "rating": [
                            {
                                "_id": "5a283ba1e892b9001e44fd6e",
                                "userid": "5a2838d7407de3001da76d00",
                                "materialid": "5a2838e4407de3001da76d72",
                                "rating": 4
                            },
                            {
                                "_id": "5a2846614bd89f001ee98d36",
                                "userid": "5a2838d7407de3001da76d1e",
                                "materialid": "5a2838e4407de3001da76d72",
                                "rating": 4
                            }
                        ]
                    }
                }
            })
        );

        const expected = {
            "_id": "5a2838e4407de3001da76d72",
            "name": "manual",
            "originalname": "components.pdf",
            "filename": "e506a9172af9259843342dc44c58f763",
            "path": "src/lib/seed/e506a9172af9259843342dc44c58f763",
            "size": 33600,
            "mimetype": "application/pdf",
            "__v": 2,
            "avgRating": 4,
            "rating": [
                {
                    "_id": "5a283ba1e892b9001e44fd6e",
                    "userid": "5a2838d7407de3001da76d00",
                    "materialid": "5a2838e4407de3001da76d72",
                    "rating": 4
                },
                {
                    "_id": "5a2846614bd89f001ee98d36",
                    "userid": "5a2838d7407de3001da76d1e",
                    "materialid": "5a2838e4407de3001da76d72",
                    "rating": 4
                }
            ]
        };

        it('returns a matching rating', async () => {
            const result = await post(PACT_HOST + '/api/product/material/5a2838e4407de3001da76d72/rating',
                {headers: headers, body: JSON.stringify({rating: 4})});

            expect(result).toEqual({...expected, status: 201})
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
                  path: '/api/product/material/5a2838e4407de3001da76d72/rating',
                  headers
              },
              willRespondWith: {
                  status: 200,
                  headers: { 'Content-Type': 'application/json; charset=utf-8' },
                  body: Matchers.eachLike(
                      {
                          "_id": "5a283ba1e892b9001e44fd6e",
                          "userid": "5a2838d7407de3001da76d00",
                          "materialid": "5a2838e4407de3001da76d72",
                          "rating": 4
                      }
                  )
              }
      })
      );
      
      it('returns a list of ratings', async () => {
          const result = await get(PACT_HOST + '/api/product/material/5a2838e4407de3001da76d72/rating', {headers});

          const expected =[
              {
                  "_id": "5a283ba1e892b9001e44fd6e",
                  "userid": "5a2838d7407de3001da76d00",
                  "materialid": "5a2838e4407de3001da76d72",
                  "rating": 4
              }];

          expected.status = 200; // fix for ugly mapping of response status

          expect(result).toEqual(expected)
      });
      it('successfully verifies', () => provider.verify())
  })
  */
})
