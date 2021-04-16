export default [
  `const app = Vue.createApp({
  template: \`
    <h1>Hello World</h1>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
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

app.mount('#root')`,
  `const app = Vue.createApp({
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

app.mount('#root')`,
  `const app = Vue.createApp({
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

app.mount('#root')`,
  `const app = Vue.createApp({
  template: \`
    <my-component name="Messi"></my-component>
    <my-component name="Ronaldo"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  template: \`
    <div>
      <button>{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  template: \`
    <my-component name="Messi"></my-component>
    <my-component name="Ronaldo"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  template: \`
    <my-component name="Messi"></my-component>
    <my-component name="Ronaldo"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  template: \`
    <my-component name="Messi"></my-component>
    <my-component name="Ronaldo"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
      this.$emit('goal', { player: this.name })
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  template: \`
    <my-component name="Messi" @goal="onGoal"></my-component>
    <my-component name="Ronaldo" @goal="onGoal"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
      this.$emit('goal', { player: this.name })
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  methods: {
    onGoal(event) {
      console.log(\`Goal by \${event.player}\`)
    },
  },
  template: \`
    <my-component name="Messi" @goal="onGoal"></my-component>
    <my-component name="Ronaldo" @goal="onGoal"></my-component>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
      this.$emit('goal', { player: this.name })
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  methods: {
    onGoal(event) {
      console.log(\`Goal by \${event.player}\`)
    },
  },
  template: \`
    <my-component name="Messi" @goal="onGoal"></my-component>
    <my-component name="Ronaldo" @goal="onGoal"></my-component>
  \`,
})

app.component('my-box', {
  template: \`
    <div :style="{ border: '8px solid hotpink' }">
      <slot></slot>
    </div>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
      this.$emit('goal', { player: this.name })
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  methods: {
    onGoal(event) {
      console.log(\`Goal by \${event.player}\`)
    },
  },
  template: \`
    <my-box>
      <my-component name="Messi" @goal="onGoal"></my-component>
      <my-component name="Ronaldo" @goal="onGoal"></my-component>
    </my-box>
  \`,
})

app.component('my-box', {
  template: \`
    <div :style="{ border: '8px solid hotpink' }">
      <slot></slot>
    </div>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
      this.$emit('goal', { player: this.name })
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
  `const app = Vue.createApp({
  data() {
    return { players: ['Messi', 'Ronaldo', 'Laspada'] }
  },
  methods: {
    onGoal(event) {
      console.log(\`Goal by \${event.player}\`)
    },
  },
  template: \`
    <my-box>
      <my-component 
        v-for="player in players" 
        :name="player" 
        @goal="onGoal">
      </my-component>
    </my-box>
  \`,
})

app.component('my-box', {
  template: \`
    <div :style="{ border: '8px solid hotpink' }">
      <slot></slot>
    </div>
  \`,
})

app.component('my-component', {
  props: ['name'],
  data() {
    return { goalCount: 2 }
  },
  methods: {
    handleClick() {
      this.goalCount += 1
      this.$emit('goal', { player: this.name })
    },
  },
  template: \`
    <div>
      <button @click="handleClick">{{ name }}</button>
      {{ "⚽".repeat(goalCount) }}
    </div>
  \`,
})

app.mount('#root')`,
];
