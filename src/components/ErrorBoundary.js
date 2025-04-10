import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>出现了一些问题，请刷新页面重试。</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
