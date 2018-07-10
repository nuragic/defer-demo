import { ApolloLink } from 'apollo-link';
import Observable from 'zen-observable';

function isPatch(data) {
  return data.path !== undefined
}

function mergePatch(result, patch) {
  const keyPath = patch.path;
  let curKey;
  let curPointer = result.data
  while (keyPath.length !== 0) {
    curKey = keyPath.shift()

    const isLeaf = keyPath.length === 0;
    if (isLeaf) {
      curPointer[curKey] = patch.data
    } else {
      if (curPointer[curKey] === null || curPointer[curKey] === undefined) {
        // Check whether it should be an array or an object by looking at the
        // next key
        if (typeof keyPath[0] === 'string') {
          curPointer[curKey] = {}
        } else if (typeof keyPath[0] === 'number') {
          curPointer[curKey] = []
        }
      }
      curPointer = curPointer[curKey]
    }
  }
}

class DeferLink extends ApolloLink {

  constructor() {
    super()
    this.result = {}
  }

  request(operation, forward) {
    return new Observable(observer => {
      forward(operation).subscribe({
        next: data => {
          console.log(`data: ${JSON.stringify(data, null, 2)}`);
          if (!isPatch(data)) {
            Object.assign(this.result, data)
          } else {
            mergePatch(this.result, data)
          }
          observer.next(this.result);
        },
        error: error => {
          console.log(`error: ${JSON.stringify(error, null, 2)}`);
          observer.error(error)
        },
        complete: () => {
          console.log('Completed!');
          observer.complete();
        },
      });
    });
  }
}

export default DeferLink;
