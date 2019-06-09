import { isType, fromPayload } from "rereducer";
import { Action, ActionType } from "storeTypes";

(() => { /// isType
  // $ExpectType ReducerLikeFunction<any, Action, boolean>
  const basicAction = isType<Action>(ActionType.Action1);

  // $ExpectError
  const unmatchingAction = isType<Action>("foo");

  const typeLess = isType<{ type: string }>("pass");

  // $ExpectError
  const unmatchingType = isType<{ payload: any }>("foo");
});

(() => { /// payload
  const basicPayload = fromPayload(['foo', 'bar']);

  // $ExpectType string
  const resStr = basicPayload('', {
    payload: {
      foo: {
        bar: 'hey'
      }
    }
  });

  // $ExpectType number
  const resNum = basicPayload('', {
    payload: {
      foo: {
        bar: 3
      }
    }
  });

  const bar: {
    [key: string]: number
  } = {
    bar: 3
  };
  // $ExpectType number | undefined
  const resEmpty = basicPayload('', {
    payload: {
      foo: bar
    }
  });

  // $ExpectType never
  const resNever = basicPayload('', {
    payload: {
      baz: {
        bar: 3
      }
    }
  });
});
