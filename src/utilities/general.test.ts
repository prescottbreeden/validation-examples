import {
  all,
  display,
  handleChangeEvent,
  prop,
  replaceItem,
  trace,
} from './general.utils';

describe('all', () => {
  it('returns true if all elements in array are true', () => {
    const array = [true, true, true];
    expect(all(array)).toBe(true);
  });
  it('returns false if any element in array is false', () => {
    const array = [true, false, true];
    expect(all(array)).toBe(false);
  });
});

describe('upsertItem', () => {
  it('returns a new list with the upserted item where ids match', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(replaceItem(array, { id: 2, name: 'dingo' })).toStrictEqual([
      { id: 1 },
      { id: 2, name: 'dingo' },
      { id: 3 },
    ]);
  });
  it('returns original list if no ids match', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(replaceItem(array, { id: 4 })).toStrictEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
});

describe('display', () => {
  it('returns the property', () => {
    const obj = { name: 'dingo', isFalse: false };
    const f = display(obj);
    expect(f('name')).toBe('dingo');
    expect(f('isFalse')).toBe(false);
  });
  it('returns an empty string if property', () => {
    const obj = { name: 'dingo' };
    const f = display(obj);
    expect(f('bald' as any)).toBe('');
  });
});

describe('prop', () => {
  it('returns the property', () => {
    const obj = { name: 'dingo', isFalse: false };
    expect(prop('name', obj)).toBe('dingo');
    expect(prop('isFalse', obj)).toBe(false);
  });
  it('returns undefined if obj is falsey', () => {
    const obj = null;
    expect(prop('name', obj)).toBe(undefined);
  });
});

describe('handleChangeEvent', () => {
  it('returns an object { [name]: value } from event', () => {
    const fakeEvent = {
      target: {
        name: 'nickname',
        value: 'bobbytables',
      },
    };
    const expected = { nickname: 'bobbytables' };
    expect(handleChangeEvent(fakeEvent as any)).toStrictEqual(expected);
  });
});

describe('trace', () => {
  it('returns the payload', () => {
    expect(trace('dingo', 42)).toBe(42);
  });
});
