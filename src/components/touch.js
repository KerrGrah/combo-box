import React, {PureComponent} from 'react';

export default class Touch extends PureComponent {

  render() {

    if (!this.props.countries)
      return "";

    const list = this.props.countries.map(country => <option className={country.name} value={country.name}>{country.name}</option>)

    return (
      <select onChange={this.props.handleSelection.bind(this)} className="native-mobile-select">{list}</select>
    )
  }
}
