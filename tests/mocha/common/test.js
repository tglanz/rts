import { assert } from 'chai';
import { Subject } from 'rxjs';

import eventHub from '../../../src/common/eventHub';

describe("eventHub", () => {
  it("publish event without payload, subscription is fired and payload is defined", done => {
    eventHub.subscribe('test-event').take(1).subscribe(payload => {
      assert.isDefined(payload);
      done();
    });

    eventHub.publish('test-event');
  });

  it("publish event with payload, subscription is fired and payload is valid", done => {
    const somePayload = {
      someProp: 'someValue'
    };

    eventHub.subscribe('test-event').take(1).subscribe(payload => {
      assert.strictEqual(payload, somePayload);
      done();
    });

    eventHub.publish('test-event', somePayload);
  });

  it("publish two different events, the correct subscriptions are fired", done => {
    const payload1 = { prop: "value1" };
    const payload2 = { prop: "value2" };

    const assertionsStream = new Subject();

    eventHub.subscribe('event-1').take(1).subscribe(payload => {
      assert.strictEqual(payload, payload1);
      assertionsStream.next();
    });

    eventHub.subscribe('event-2').take(1).subscribe(payload => {
      assert.strictEqual(payload, payload2);
      assertionsStream.next();
    });

    // only when two occurrences happens
    assertionsStream.take(2).subscribe({
      complete: () => done()
    });

    eventHub.publish('event-1', payload1);
    eventHub.publish('event-2', payload2);
  });
});
