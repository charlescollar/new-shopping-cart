import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import data from './static/data/products.json';

class Item extends React.Component {
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
            <button>Add To Cart</button>
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
        <Item product={product} />
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
  render() {
    return (
      <div class="container">
        <Shelf products={this.props.data.products}/>
      </div>
    );
  }
}

ReactDOM.render(<ShoppingCartApp data={data}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
