const ReactCSSTG = React.addons.CSSTransitionGroup
import { Component } from 'react'

type Props = {}
let component = this.state.isVisible ? (
  <Modal onSubmit={this.handleSubmit} key="modal" />
) : (
  <ModalBack onClick={this.handleRemount} key="bringitback" />
)
// Main app
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemount = this.handleRemount.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState(
      {
        isVisible: false
      },
      function() {
        console.log(this.state.isVisible)
      }
    )
    return false
  }
  handleRemount(e) {
    this.setState(
      {
        isVisible: true
      },
      function() {
        console.log(this.state.isVisible)
      }
    )
    e.preventDefault()
  }
  render() {
    // const for React CSS transition declaration

    return (
      <div>
        <Head title="Login" />
        <Nav />
        <ReactCSSTG
          transitionName="animation"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {component}
        </ReactCSSTG>
      </div>
    )
  }
}

// Modal
class Modal extends React.Component {
  render() {
    return (
      <div className="Modal">
        <form onSubmit={this.props.onSubmit}>
          <Input type="text" name="username" placeholder="username" />
          <Input type="password" name="password" placeholder="password" />
          <button> Sign In</button>
        </form>
        <a href="#">Lost your password ?</a>
      </div>
    )
  }
}

// Generic input field
class Input extends React.Component {
  render() {
    return (
      <div className="Input">
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required
          autocomplete="false"
        />
        <label for={this.props.name} />
      </div>
    )
  }
}

// Button to brind the modal back
class ModalBack extends React.Component {
  render() {
    return (
      <button className="bringitback" onClick={this.props.onClick} key={this.props.className}>
        Brind the modal back !
      </button>
    )
  }
}

// ReactDOM.render(<App />, document.getElementById('app'))

export default Login
