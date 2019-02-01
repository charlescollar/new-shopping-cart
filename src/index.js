import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import data from './static/data/products.json';

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
              inStock={true}
            />
            <AddButton
              size="S"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={true}
            />
            <AddButton
              size="M"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={true}
            />
            <AddButton
              size="ML"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={true}
            />
            <AddButton
              size="L"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={false}
            />
            <AddButton
              size="XL"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={true}
            />
            <AddButton
              size="XXL"
              product={this.props.product}
              onAddToCart={this.handleAddToCart}
              inStock={true}
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
      rows.push(
        <Item
          product={product}
          onAddToCart={this.props.onAddItemsToCart}
          key={product.id}
        />
      );
    });
    return (
      <div className="shelf">
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
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }
  handleAddToCart(item) {
    let tempCart = this.state.shoppingCart;
    let newItem = true;
    for (let i = 0; i < tempCart.length; i++) {
      if (item.id === tempCart[i].id && tempCart[i].size === item.size) {
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
  };
  handleRemoveFromCart(item) {
    let tempCart = this.state.shoppingCart;
    for (let i = 0; i < tempCart.length; i++) { // Find item
      if (item.id === tempCart[i].id && item.size === tempCart[i].size) {
        if (tempCart[i].quantity > 1) { // Reduce quantity
          tempCart[i].quantity--;
        }
        else { // Otherwise remove item
          tempCart.splice(i,1);
        }
        this.setState({
          shoppingCart: tempCart
        });
        break;
      }
    }
  }
  render() {
    return (
      <div className="container">
        <Shelf
          products={this.props.data.products}
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
