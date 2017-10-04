import test from 'ava';
import {nfg} from '../lib/nfg.js';

test('Test IsRepo', t => {
  let tests = [
    {input: "user/reponame", expect: true},
    {input: "someuser/repo-with-dash.go", expect: true},
    {input: "user/dot.in.name", expect: true},
    {input: "http://github.com/user/repo", expect: false},
  ];

  tests.map( test => {
    let result = nfg.IsRepo(test.input);
    t.is(test.expect, result);
  });
});

// 😬 Need more tests
