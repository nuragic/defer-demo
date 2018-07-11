import { ApolloLink } from 'apollo-link';
import Observable from 'zen-observable';

function isPatch(data) {
  return data.path !== undefined;
}

function mergePatch(result, patch) {
  const keyPath = patch.path.slice(0); // Do not modify original array
  let curKey;
  let curPointer = result.data;
  while (keyPath.length !== 0) {
    curKey = keyPath.shift();

    const isLeaf = keyPath.length === 0;
    if (isLeaf) {
      curPointer[curKey] = patch.data;
    } else {
      if (curPointer[curKey] === null || curPointer[curKey] === undefined) {
        // This is indicative of a patch that is not ready to be merged, which
        // can happen if patches for inner objects arrive before its parent.
        // Treat this as a failure to merge.
        return false;

        // Check whether it should be an array or an object by looking at the
        // next key, then defensively create the object if it is not present.
        // if (typeof keyPath[0] === 'string') {
        //   curPointer[curKey] = {}
        // } else if (typeof keyPath[0] === 'number') {
        //   curPointer[curKey] = []
        // }
      }
      curPointer = curPointer[curKey];
    }
  }
  return true;
}

class DeferLink extends ApolloLink {
  constructor() {
    super();
    this.result = {};
    this.unmergedPatches = [];
  }

  request(operation, forward) {
    const self = this;
    return new Observable(observer => {
      forward(operation).subscribe({
        next: data => {
          console.log(`data: ${JSON.stringify(data, null, 2)}`);
          if (!isPatch(data)) {
            Object.assign(this.result, data);
          } else {
            if (!mergePatch(this.result, data)) {
              // May fail to merge if parent object is not available yet, try
              // again later
              self.unmergedPatches.push(data);
            } else {
              // Try all unmerged patches again
              this.unmergedPatches = this.unmergedPatches.filter(patch => {
                const success = mergePatch(this.result, patch);
                return !success;
              });
            }
          }
          observer.next(this.result);
        },
        error: error => {
          console.log(error);
          observer.error(error);
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
