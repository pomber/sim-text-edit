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

"Delete 1": [`
foo {
  bar
}`.trim(),``],

  
// ---

"Delete 2": [`
{
  foo bar  
  bar foo
}`.trim(),`
{
  foo foo
}`.trim()],

// ---

"Replace": [`
foo {
  bar: "x" + "foobar"
}`.trim(),`
foo {
  bar: "x" + "barfoo"
}`.trim()],


// ---

"Replace 2": [`
foo {
  data() {
    return { name: 'Hello!' }
  }
}`.trim(),`
foo {
  props: ['name'],
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
.trim()],

// ---

"Demo 2": [`
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
.trim(),`
const app = Vue.createApp({
  template: \`
    <my-component></my-component>
    <my-component></my-component>
  \`,
})

app.component('my-component', {
  data() {
    return { name: 'Hello!' }
  },
  template: \`
    <div>
      <button>{{ name }}</button>
    </div>
  \`,
})

app.mount('#root')`.trim()],

// ---

"Demo 3": [`
const app = Vue.createApp({
  template: \`
    <my-component></my-component>
    <my-component></my-component>
  \`,
})

app.component('my-component', {
  data() {
    return { name: 'Hello!' }
  },
  template: \`
    <div>
      <button>{{ name }}</button>
    </div>
  \`,
})

app.mount('#root')`
.trim(),`
const app = Vue.createApp({
  template: \`
    <my-component name="Messi"></my-component>
    <my-component name="Ronaldo"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  template: \`
    <div>
      <button>{{ name }}</button>
    </div>
  \`,
})

app.mount('#root')`.trim()]


};
