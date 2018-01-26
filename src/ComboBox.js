import React, {Component} from 'react';
import {connect} from 'react-redux';
import bemCn from 'bem-cn-fast';
import Touch from './components/touch';
import NoTouch from './components/no-touch';
import {getCountries, userSelected} from './actions/actions';
import style from './style.css';

class ComboBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      matching: [],
      focus: false,
      touchScreen: false,
      listVisible: false,
      inFocus: 0,
      scrollTop: 0,
      selected: "",
      showListAbove: false
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.matching.length === 0 && this.state.inputValue === "") {
      this.setState(() => ({matching: nextProps.countries}))
    }
  };

  componentDidMount() {
    this.props.dispatch(getCountries('russian'));

    this.setState(()=> ({touchScreen: this.isMobileDevice()}))
    window.addEventListener('touchstart', () => {
      this.setState(()=> ({touchScreen: true}))
    })
  };

  isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };

  handleTouchSelection = (e) => {
    return this.handleSelection(e.target.value)
  };

  handleSelection = (value) => {
    const selected =  value || this.state.matching[this.state.inFocus].name;
    this.setState(()=> ({selected: selected, inputValue: selected, listVisible: false, matching: this.getMatching(selected)}),
      ()=> {this.props.dispatch(userSelected(selected))})
  };

  handleKey = (e) => {
    switch (e.keyCode) {
      // enter-key
      case 13:
        this.handleSelection();
        break;
        // up-key
      case 38:
        e.preventDefault();
        // limit to zero
        const inFocus = this.state.inFocus ? this.state.inFocus - 1 : 0;
        this.setState(() => ({
          inFocus: inFocus,
          scrollTop: inFocus * 42 -42
        }));
        break;
        // down-key
      case 40:
        e.preventDefault();
        // limit to max of list
        const maxIndex = this.state.matching.length - 1
        if (this.state.inFocus < maxIndex) {
          this.setState((state) => ({
            inFocus: state.inFocus + 1,
            scrollTop: (state.inFocus + 1) * 42 - 42
        }))
      }
    }
  }

  getMatching = (val) => {
    const results = this.props.countries.filter(country => {
      return country.name.toLowerCase().startsWith(val.toLowerCase())
    })
    return results
  }

  handleChange = (e) => {
    const val = e.target.value;
    this.setState(() => ({inputValue: val, matching: this.getMatching(val), selected: "", listVisible: true, inFocus: 0, scrollTop: 0}))
  };

  handleFocus = () => {
    const elem = document.getElementsByClassName('select__text')[0]
    const rect = elem.getBoundingClientRect();
    const showListAbove = (window.innerHeight - rect.bottom) < 260;

    this.setState({focus: true, listVisible: true, showListAbove: showListAbove})
  };

  handleBlur = () => {
    this.setState((state) => ({
      focus: !!state.inputValue,
      listVisible: false,
      showListAbove: false
    }))
  };

  render() {
    const b = bemCn('select')
    const m = bemCn('select-mobile')

    if (this.state.touchScreen) {
      return (
      <div className={m()}>
        <div className={m("label-arrow-container", {hidden: !!this.props.userCountry})}>
          <p className={m("label")}>Выберите страну</p>
          <div className={m("arrow")}>&#9662;</div>
        </div>
        <input type="text" className={b("text")} value={this.state.inputValue} />
        <Touch handleSelection={this.handleTouchSelection} countries={this.props.countries} />
        {this.props.userCountry && <p className={m("user-selected-country")}>{this.props.userCountry}</p>}
      </div>
      )
    }

    return (
      <div className={b()}>
        <div className={b("label-arrow-container", {focus: this.state.focus, hidden:this.state.showListAbove})}>
          <p className={b("label")}>Выберите страну</p>
          <div className={b("arrow")}>&#9662;</div>
        </div>
         <input type="text" value={this.state.inputValue} className={b("text", {focus: this.state.focus, "content-above": this.state.showListAbove,})} onKeyDown={this.handleKey} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
         <NoTouch showListAbove={this.state.showListAbove} highlight={this.state.inputValue.length} scroll={this.state.scrollTop} inFocus={this.state.inFocus} handleClick={this.handleSelection} listVisible={this.state.listVisible} countries={this.state.matching}/>
        {this.props.userCountry && <p className={b("user-selected-country")} >{this.props.userCountry}</p>}
      </div>
    )
  }
}

const mapStateToProps = store => {

  return {
          countries: store.countries,
          userCountry: store.userCountry
        }
}

export default connect(mapStateToProps)(ComboBox);
