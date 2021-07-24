import test from 'ava';
import PoolUser from '../pool';
import { pTimeout } from './_util';

test('pool test', async t => {


  let res = [...Array(10)].map(_ => {

    let pu = new PoolUser();

    return pu.connect().then(() => {
      pu.poolIn();
    });
  });

  await Promise.all(res);

  await pTimeout(20000);
});
