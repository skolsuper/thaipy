import * as moment from 'moment';

export function humanizeAgoFilter () {
  return function humanizeAgo (text) {
    return moment(text).fromNow();
  }
}
