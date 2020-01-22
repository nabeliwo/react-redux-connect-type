import React, { FC } from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
// @ts-ignore
import { Provider, connect } from 'react-redux'

// types
type ConnectedComponentFactory<ConnectedProps> =
  <P extends ConnectedProps>(
    Component: React.ComponentType<P>,
  ) => React.ComponentType<Pick<P, Exclude<keyof P, keyof ConnectedProps>>>;

declare function connect<StateProps, DispatchProps>(
  mapStateToProps: (state: any) => StateProps,
  mapDispatchToProps: () => DispatchProps,
): ConnectedComponentFactory<StateProps & DispatchProps>

type Store = {
  name: string
  age: number
}

// component
const AppComponent: FC<{
  title: string
  name: string
  age: number
  onClickButton1: (text: string) => void
  onClickButton2: (value: number) => void
}> = ({ title, name, age, onClickButton1, onClickButton2 }) => (
  <div>
    <h1>{title}</h1>
    <h2>name: {name}, age: {age}</h2>
    <button onClick={() => onClickButton1('clicked!!')}>button1</button>
    <button onClick={() => onClickButton2(100)}>button2</button>
  </div>
)

// container
const mapStateToProps = (state: Store) => ({
  name: state.name,
  age: state.age,
})

const mapDispatchToProps = () => ({
  onClickButton1: (text: string) => {
    console.log(text)
  },
  onClickButton2: (value: number) => {
    console.log(value)
  },
})

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)


// start
const initialState: Store = {
  name: 'charlie',
  age: 17,
}

ReactDom.render(
  <Provider store={createStore(() => initialState)}>
    <App title="Hello, world!" />
  </Provider>,
  document.getElementById('root')
)
