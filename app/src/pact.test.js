import Pact from 'pact';
import wrapper from '@pact-foundation/pact-node';
import path from 'path';
import {get} from './lib/http'

const PACT_SERVER_PORT = 1234;
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
      console.log("YAY OR NAY", mockEventsService);
      provider = Pact({ consumer: 'Events Frontend', provider: 'Events Service', port: 1234 })
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
    fail(err);
    done();
  }


  describe('returns the expected result when the events service returns a list of events', () => {
    //const expectedResult = eventsClientFixtures.getEvents.TWO_EVENTS;
    //const eventsClient = new EventsClient({host: `http://localhost:${PACT_SERVER_PORT}`});
  
    beforeEach((done) => {
      console.log("A MESSAGE", provider)
      provider.addInteraction({
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
      }).then(() => {console.log("I MADI IT"); done()}).catch((err) => catchAndContinue(err, done));
    });
  
    afterEach((done) => {
      provider.finalize().then(() => done()).catch((err) => catchAndContinue(err, done));
    });
  
    it('returns a list of events', async () => {
      const events = await get('localhost:1234/api');
      console.log(events)
      expect(events).toEqual({message: 'Welcome to backend API!'});
      provider.verify(events);
    });
  });



})




