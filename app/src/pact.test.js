import Pact from 'pact';
import wrapper from '@pact-foundation/pact-node';
import path from 'path';
import {get} from './lib/http'
import fetch from 'isomorphic-fetch'

const PACT_SERVER_PORT = 12340;
const PACT_SPECIFICATION_VERSION = 2;

const mockEventsService = wrapper.createServer({
  port: PACT_SERVER_PORT,
  spec: PACT_SPECIFICATION_VERSION,
  log: path.resolve(process.cwd(), '../pact/logs', 'events-service-pact-integration.log'),
  dir: path.resolve(process.cwd(), '../pact/pacts')
});

describe('set up pact', () => {

  var provider;

  beforeEach((done) => {
    mockEventsService.start().then(() => {
      
      provider = Pact({ consumer: 'Events Frontend', provider: 'Events Service', port: 12340 })
      done();
    }).catch((err) => catchAndContinue(err, done));
  });

  afterAll(() => {
    wrapper.removeAllServers();
  });

  afterEach((done) => {
    mockEventsService.delete().then(() => {
      done();
    })
    .catch((err) => catchAndContinue(err, done));
  });

  function catchAndContinue(err, done) {
    console.log("ERROR", err)
    fail(err);
    done();
  }


  describe('returns the expected result when the events service returns a list of events', () => {
    //const expectedResult = eventsClientFixtures.getEvents.TWO_EVENTS;
    //const eventsClient = new EventsClient({host: `http://localhost:${PACT_SERVER_PORT}`});
  
    beforeEach(async() => {
      
      await provider.addInteraction({
        uponReceiving: 'a request for testing',
        withRequest: {
          method: 'GET',
          path: '/api',
          headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {message: 'Welcome to backend API!'}
        }
      });
    });
  
    afterEach(async() => {
      //await provider.finalize();
    });
  
    it('returns a list of events', async () => {
      //const response = await fetch('http://localhost:12340/api', {headers: { 'Accept': 'application/json' }});
      //const result = await response.json()
      //console.log(result)
    
      //expect(result).toEqual({message: 'Welcome to backend API!'});
      //provider.verify(result);
    });
  });



})




