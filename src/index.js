import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import data from './static/data/products.json';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey: "AIzaSyAmSOyurQNyIW6gmfHDbUHMzqwD2U72viU",
  authDomain: "charlie-shopping-cart.firebaseapp.com"
})

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  handleAddToCart() {
    this.props.onAddToCart({ 
      id: this.props.product.id,
      sku: this.props.product.sku,
	  title: this.props.product.title,
	  description: this.props.product.description,
	  style: this.props.product.style,
	  price: this.props.product.price,
	  currencyId: this.props.product.currencyId,
	  currencyFormat: this.props.product.currencyFormat,
	  isFreeShipping: this.props.product.isFreeShipping,
	  size: this.props.size,
	  quantity:1
    });
  }
  render() {
    if (this.props.inStock) {
      return (
 	    <span className="in-stock"
	      onClick={() => this.handleAddToCart()}
	    >{this.props.size}</span>
	  );
    }
    else {
      return (
        <span>{this.props.size}</span>
      );
    }
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  handleAddToCart(item) {
    this.props.onAddToCart(item);
  }
  render() {
    return (
      <div className="item">
        <div>
          <span className="shipping">Free Shipping</span>
          <img src={require(`./static/products/${this.props.product.sku}_1.jpg`)} alt=""/>
          <h5>{this.props.product.title}</h5>
          <span className="price">
            <span className="currency">{this.props.product.currencyFormat}</span>
            <span className="bignum">{Math.floor(this.props.product.price)}</span>
            <span className="smallnum">{(this.props.product.price % 1).toFixed(2).replace(/^0+/, '')}</span>
          </span>
          <div className="addtocart">
            <div>
            Click a size to add to cart<br />
            <AddButton
              size="XS"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("XS"))}
            />
            <AddButton
              size="S"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("S"))}
            />
            <AddButton
              size="M"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("M"))}
            />
            <AddButton
              size="ML"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("ML"))}
            />
            <AddButton
              size="L"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("L"))}
            />
            <AddButton
              size="XL"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("XL"))}
            />
            <AddButton
              size="XXL"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={(-1 != this.props.product.availableSizes.indexOf("XXL"))}
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Shelf extends React.Component {
  render() {
    const rows=[];
    
    this.props.products.forEach((product) => {
      const sizes = this.props.selectedSizes;
      let show = !(sizes.XS || sizes.S || sizes.M || sizes.ML || sizes.L || sizes.XL || sizes.XXL);
      // Showing all sizes if none are selected
      
      product.availableSizes.forEach((size) => {
        switch(size) {
          case "XS":
            show |= sizes.XS;
            break;
          case "S":
            show |= sizes.S;
            break;
          case "M":
            show |= sizes.M;
            break;
          case "ML":
            show |= sizes.ML;
            break;
          case "L":
            show |= sizes.L;
            break;
          case "XL":
            show |= sizes.XL;
            break;
          case "XXL":
            show |= sizes.XXL;
            break;
        }
      });
      if (show) {
        rows.push(
          <Item
            product={product}
            onAddToCart={this.props.onAddItemsToCart}
            key={product.id}
          />
        );
      }
    });
    return (
      <div className="shelf">
        {rows}
      </div>
    );
  }
}

class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilterSize = this.handleFilterSize.bind(this);
  }
  handleFilterSize(size,value) {
    this.props.onFilterSize(size,value);
  }
  render() {
    return (
      <div className="filter">Filter By Sizes:
        <span className={this.props.selectedSizes.XS?"selected":"unselected"} onClick={()=>{this.handleFilterSize("XS",!this.props.selectedSizes.XS);}}>XS</span>
        <span className={this.props.selectedSizes.S?"selected":"unselected"} onClick={()=>{this.handleFilterSize("S",!this.props.selectedSizes.S);}}>S</span>
        <span className={this.props.selectedSizes.M?"selected":"unselected"} onClick={()=>{this.handleFilterSize("M",!this.props.selectedSizes.M);}}>M</span>
        <span className={this.props.selectedSizes.ML?"selected":"unselected"} onClick={()=>{this.handleFilterSize("ML",!this.props.selectedSizes.ML);}}>ML</span>
        <span className={this.props.selectedSizes.L?"selected":"unselected"} onClick={()=>{this.handleFilterSize("L",!this.props.selectedSizes.L);}}>L</span>
        <span className={this.props.selectedSizes.XL?"selected":"unselected"} onClick={()=>{this.handleFilterSize("XL",!this.props.selectedSizes.XL);}}>XL</span>
        <span className={this.props.selectedSizes.XXL?"selected":"unselected"} onClick={()=>{this.handleFilterSize("XXL",!this.props.selectedSizes.XXL);}}>XXL</span>
      </div>
    );
  }
}

class ShoppingCartApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: [],
      showingSizes: {
        "XS":false,
        "S":false,
        "M":false,
        "ML":false,
        "L":false,
        "XL":false,
        "XXL":false
      }
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleFilterSize = this.handleFilterSize.bind(this);
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  handleAddToCart(item) {
    let tempState = this.state;
    let newItem = true;
    for (let i = 0; i < tempState.shoppingCart.length; i++) {
      if (item.id === tempState.shoppingCart[i].id && tempState.shoppingCart[i].size === item.size) {
        newItem = false;
        tempState.shoppingCart[i].quantity++;
        this.setState(tempState);
      }
    }
    if (newItem) {
      tempState.shoppingCart.push(item);
      this.setState(tempState);
    }
  };
  handleRemoveFromCart(item) {
    let tempState = this.state;
    for (let i = 0; i < tempState.shoppingCart.length; i++) { // Find item
      if (item.id === tempState.shoppingCart[i].id && item.size === tempState.shoppingCart[i].size) {
        if (tempState.shoppingCart[i].quantity > 1) { // Reduce quantity
          tempState.shoppingCart[i].quantity--;
        }
        else { // Otherwise remove item
          tempState.shoppingCart.splice(i,1);
        }
        this.setState(tempState);
        break;
      }
    }
  }
  handleFilterSize(size,value) {
    let tempState = this.state;
    switch (size) {
      case "XS":
        tempState.showingSizes.XS = value;
        break;
      case "S":
        tempState.showingSizes.S = value;
        break;
      case "M":
        tempState.showingSizes.M = value;
        break;
      case "ML":
        tempState.showingSizes.ML = value;
        break;
      case "L":
        tempState.showingSizes.L = value;
        break;
      case "XL":
        tempState.showingSizes.XL = value;
        break;
      case "XXL":
        tempState.showingSizes.XXL = value;
        break;
    }
    this.setState(tempState);
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  render() {
    let includeLogin = this.state.isSignedIn? null : (<div className="login">
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>);
    return (
      <div className="container">
        {includeLogin}
        <Filters 
          onFilterSize={this.handleFilterSize}
          selectedSizes={this.state.showingSizes}
        />
        <Shelf
          products={this.props.data.products}
          selectedSizes={this.state.showingSizes}
          onAddItemsToCart={this.handleAddToCart}
        />
        <Cart
          cart={this.state.shoppingCart}
          onRemoveItem={this.handleRemoveFromCart}
        />
      </div>
    );
  }
}

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart-item">
        <div>
          <img src={require(`./static/products/${this.props.product.sku}_1.jpg`)} alt="" />
          <div className="cart-details">
            <h5>{this.props.product.title} ({this.props.product.size})</h5>
            <span className="cart-remove" onClick={() => {this.props.onRemoveItem(this.props.product)}}>X</span>
            <span className="cart-desc">{this.props.product.style}</span>
            <span className="cart-price">
              <span className="cart-currency">{this.props.product.currencyFormat}</span>
              <span className="cart-bignum">{Math.floor(this.props.product.price)}</span>
              <span className="cart-smallnum">{(this.props.product.price % 1).toFixed(2).replace(/^0+/, '')}</span>
              <span className="cart-quantity">x{(this.props.product.quantity)}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.setState({isOpen:false});
  };
  state = {
    isOpen: false
  };
  toggleCart = (value) => {
    this.setState({ isOpen: value });
  };
  render() {
    const rows=[];
    let totalprice = 0;
    this.props.cart.forEach((product) => {
      rows.push(
        <CartItem
          onRemoveItem={this.props.onRemoveItem}
          product={product}
          key={product.id}
        />
      );
      totalprice += product.price * product.quantity;
    });
    return (
      <div className={this.state.isOpen?"cart cart-open":"cart"} >
        <div className="cart-button"
             onClick={() => this.toggleCart(!this.state.isOpen)}>&#9776;</div>
        <h2>Cart</h2>
        <div className="cart-items">
          {rows}
        </div>
        <div className="cart-summary">
          <span className="total-price">Total: {(totalprice).toFixed(2).replace(/^0+/, '')}</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ShoppingCartApp data={data}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
