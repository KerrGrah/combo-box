import React, {Component} from 'react';
import bemCn from 'bem-cn-fast';

export default class Desktop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseOver: false
    }
  };

  componentDidUpdate() {
    const listContainer = document.getElementsByClassName('desktop-list')[0];
    if (listContainer)
      listContainer.scrollTop = this.props.scroll;
  };

  handleMouse = (el) => {
    this.setState(() => ({
      mouseOver: !this.state.mouseOver
    }))
  };

  render() {

    if (!this.props.countries)
      return "";

    const b = bemCn("desktop-list")

    const list = this.props.countries.map((country, index) => {
      const inFocus = (this.props.inFocus === index) && !this.state.mouseOver;
      const matchedChars = country.name.substring(0, this.props.highlight)
      const remaingChars = country.name.substring(this.props.highlight)
      return <div onMouseDown={this.props.handleClick.bind(this, country.name)} className={b("item", {focus: inFocus})} key={country.name}>
        <p>
          <span className={b("item", {highlight: true})}>{matchedChars}</span>{remaingChars}</p>
      </div>
    })

    return (
      <div onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} className={b({visible: this.props.listVisible, above: this.props.showListAbove})}>
        {list}
      </div>
    )
  }
}
