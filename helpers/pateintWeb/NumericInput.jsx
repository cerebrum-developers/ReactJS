import { Input } from "antd";
import React from "react";

export default class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      this.props.onChange(e);
    }
  };

  render() {
    return <Input {...this.props} onChange={this.onChange} />;
  }
}
