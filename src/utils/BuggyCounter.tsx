import React from 'react';

interface Props {
  [key: string]: unknown;
}

interface State {
  counter: number;
}

class BuggyCounter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    // @TODO Fix linting
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

export default BuggyCounter;
