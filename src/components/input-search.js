import React, {Component, useContext} from "react";
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import CartIcon from './images/shopping-cart-solid.svg';
// import LogoImg from './images/logo.png';
import {Link, Redirect, withRouter, useHistory} from "react-router-dom";
//import { navigate } from "@reach/router";
import LogoImg from './images/abcd.jpeg';
import {DataContext} from '../contextAPI/dataContext';


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

class InputSearch extends Component {

    //const {cartItems, name, logOut} = useContext(DataContext);
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {
            newItem: '',
            ItemsSearched: [],
            done:false
        };
        
        // this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClicked = this.onClicked.bind(this)
    };

    // onKeyUp(event) {        
    //     if (event.keyCode === 13) {
    //         let text = event.target.value;
    //         if (!text || text === '') { return; }
    
    //         text = text.trim();
    //         if (!text) { return; }

    //         this.setState(state => {
    //             return {
    //                 newItem: '',
    //                 ItemsSearched: [text, ...this.state.ItemsSearched]
    //             };
    //         })
            
    //         const {search} = this.context;
    //         search(text);
    //     }
    // }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClicked(event) {
        event.preventDefault();
        // console.log("aa: ", this.state.newItem)
        let text = this.state.newItem;
        console.log('text: ', this.state.newItem)
        if (!text || text === '') { return; }
        
        text = text.trim();
        if (!text) { return; }

        this.setState(state => {
            return {
                newItem: '',
                ItemsSearched: [text, ...this.state.ItemsSearched]
            };
        })

        const {search} = this.context;
        search(text);
        this.props.history.push('/results')
        
    }

    render() {
        const {ItemsSearched, newItem} = this.state;

        return (
        <div id="top-search">
                        <div id="logo_header">
                            <Link to="/"><img src={LogoImg} width="140px" style={{marginTop:'-40px',marginLeft:'31%'}} /></Link>
                        </div>
                        <form onSubmit={this.onClicked}>
                            <div id="search-box">
                                <input 
                                    className='input_search12'
                                    name='newItem'
                                    type="text" 
                                    placeholder="Xu hướng tìm kiếm: ống hút, túi vải,..."
                                    value = {newItem}
                                    onChange = {this.onChange}
                                    >
                                </input>
                                <div class="btn-submit">
                                    <button  type = 'submit' className="submit" value="Tìm kiếm" id="_submit">
                                     Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </form>
        </div>
        )
        
    };
};

export default withRouter(InputSearch);