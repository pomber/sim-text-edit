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

  "Adding two lines": [`
foo {
  bar
}`.trim(),`
foo {
  bax
  sol
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
  bar: "x" + "barfoo"
}`.trim()],


// ---

"From scratch": [``,`
foo {
  bar: "x" + "foobar"
}`.trim()],

// ---


"Demo 1": [`
const app = Vue.createApp({
  template: \`
    <h1>Hello World</h1>
  \`,
})

app.mount('#root')
`.trim(),`
const app = Vue.createApp({
  template: \`
    <my-component></my-component>
    <my-component></my-component>
  \`,
})

app.component('my-component', {
  template: \`
    <div>
      <button>Hello World</button>
    </div>
  \`,
})

app.mount('#root')`
.trim()]


};
