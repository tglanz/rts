import { Subject } from 'rxjs';

const _events = new Subject();

const publish = (name, payload) => _events.next({ name, payload: payload || {} });
const subscribe = name => _events.filter(event => event.name === name).pluck('payload');

export default {
  publish, subscribe
};
