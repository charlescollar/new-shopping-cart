import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import data from './static/data/products.json';

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
      <div class="item">
        <div>
          <span class="shipping">Free Shipping</span>
          <img src={require(`./static/products/${this.props.product.sku}_1.jpg`)} />
          <h5>{this.props.product.title}</h5>
          <span class="price">
            <span class="currency">{this.props.product.currencyFormat}</span>
            <span class="bignum">{Math.floor(this.props.product.price)}</span>
            <span class="smallnum">{(this.props.product.price % 1).toFixed(2).replace(/^0+/, '')}</span>
          </span>
          <div class="addtocart">
            <button
              onClick={() => this.handleAddToCart({
                id: this.props.product.id,
                sku: this.props.product.sku,
                title: this.props.product.title,
                description: this.props.product.description,
                style: this.props.product.style,
                price: this.props.product.price,
                currencyId: this.props.product.currencyId,
                currencyFormat: this.props.product.currencyFormat,
                isFreeShipping: this.props.product.isFreeShipping,
                quantity:1
              })}
            >Add To Cart</button>
          </div>
        </div>
      </div>
    );
  }
}

class Shelf extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const rows=[];
    
    this.props.products.forEach((product) => {
      rows.push(
        <Item
          product={product}
          onAddToCart={this.props.onAddItemsToCart}
        />
      );
    });
    return (
      <div class="shelf">
        {rows}
      </div>
    );
  }
}

class ShoppingCartApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: []
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  handleAddToCart(item) {
    let tempCart = this.state.shoppingCart;
    let newItem = true;
    for (let i = 0; i < tempCart.length; i++) {
      if (item.id == tempCart[i].id) {
        newItem = false;
        tempCart[i].quantity++;
        this.setState({
          shoppingCart: tempCart
        });
      }
    }
    if (newItem) {
      tempCart.push(item);
      this.setState({
        shoppingCart: tempCart
      });
    }
  }
  render() {
    return (
      <div class="container">
        <Shelf
          products={this.props.data.products}
          onAddItemsToCart={this.handleAddToCart}
        />
        <Cart
          cart={this.state.shoppingCart}
        />
      </div>
    );
  }
}

class CartItem extends React.Component {
  render() {
    return (
      <div class="cart-item">
        <div>
          <img src={require(`./static/products/${this.props.product.sku}_1.jpg`)} />
          <div class="cart-details">
            <h5>{this.props.product.title}</h5>
            <span class="cart-desc">{this.props.product.style}</span>
            <span class="cart-price">
              <span class="cart-currency">{this.props.product.currencyFormat}</span>
              <span class="cart-bignum">{Math.floor(this.props.product.price)}</span>
              <span class="cart-smallnum">{(this.props.product.price % 1).toFixed(2).replace(/^0+/, '')}</span>
              <span class="cart-quantity">x{(this.props.product.quantity)}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class Cart extends React.Component {
  state = {
    isOpen: false
  };
  toggleCart = (value) => {
    this.setState({ isOpen: value });
  };
  render() {
    const rows=[];
    this.props.cart.forEach((product) => {
      rows.push(
        <CartItem
          product={product}
        />
      );
    });
    return (
      <div class={this.state.isOpen?"cart cart-open":"cart"}>{rows}
        <div class="cart-button"
             onClick={() => this.toggleCart(!this.state.isOpen)}>&#9776;</div>
      </div>
    );
  }
}

ReactDOM.render(<ShoppingCartApp data={data}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
