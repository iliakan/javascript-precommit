
Installs git precommit hook for running lints & checks before git commit.

# Usage

  1. Make sure your `.git` dir is on the same path as `package.json`. In other words, they share the same parent folder. Usually it is so.
  2. Edit your `package.json`, add `precommit: <what to do>`, e.g. 
```js
{ 
  "name": "My package.json",
  "precommit": "gulp lint"
}
```
  3. npm i javascript-precommit

Now every git commit will run `gulp lint` task and only pass if the task is successful.