// prettier-ignore
export default {

  "Adding one line": [`
foo {
    bar
}`.trim(),`
foo {
  bax
  bar
}`.trim()],

// ---

"Deleting all": [`
foo {
  bar
}`.trim(),``],

// ---

"Replacing": [`
foo {
  bar: "x" + "foobar"
}`.trim(),`
foo {
  bar: "x" + "foobar"
}`.trim()],


// ---

"From scratch": [``,`
foo {
  bar: "x" + "foobar"
}`.trim()],


};
