import { customElement, property, LitElement, html, css, CSSResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Product } from './Product';

import './shopping-cart-item';

@customElement('shopping-cart')
class ShoppingCart extends LitElement {

  @property({type: Boolean})
  opened: boolean = false;

  @property({type: Array})
  selectedproducts: Product[] = [];

	/** Returns the total price of all products in the cart */
	_displayTotal() {
		return this.selectedproducts.reduce((acc: number, product: Product): number => acc + (product.price * product.quantity!), 0).toFixed(2);
	}

	render() {
		return html`
			<div class="cart ${this.opened ? 'cart-open' : ''}">
				<button class="cart-btn" @click="${() => this.opened = !this.opened}">
					🛒 ${this.selectedproducts.length > 0 ? html`<span class="cart-btn-amount">(${this.selectedproducts.length})</span>` : ''}
				</button>

				<div class="cart-cont">
					<h2 class="cart-header">Shopping Cart</h2>
					<div class="cart-products">
						${repeat(this.selectedproducts,
							(product: Product) => product.id,
							(product: Product) => html`
                <shopping-cart-item
									.id=${product.id}
									.name=${product.name}
									.price=${product.price}
									.quantity=${product.quantity}
									.size=${product.size}
									.img=${product.img}>
								</shopping-cart-item>
						`)}
					</div>

					<div class="cart-total">
						<span>Total:</span>
						<span class="cart-total-price">€ ${this._displayTotal()}</span>
					</div>

					<div class="cart-footer">
						<button @click=${() => alert('Purchase success!')}>Checkout</button>
					</div>
				</div>
			</div>
		`;
	}

	static styles = css`
    :host {
      display: block;
    }

    .cart {
      color: white;
      position: fixed;
      top: 0;
      right: -450px;
      width: 450px;
      height: 100%;
      transition: right .5s;
      background-color: #1b1a20;
    }

    .cart-open {
      right: 0;
    }

    .cart-open .cart-btn {
      left: 0;
    }

    .cart-btn {
      border: none;
      background-color: #1b1a20;
      position: absolute;
      left: -50px;
      top: 0px;
      cursor: pointer;
      text-align: center;
      width: 50px;
      height: 50px;
      transition: left .5s;
    }

    .cart-btn-amount {
      color: #eabf00;
    }

    .cart-cont {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .cart-header {
      height: 50px;
      margin: 0;
      line-height: 50px;
      text-align: center;
    }

    .cart-total {
      display: flex;
      flex-direction: row;
      font-size: 20px;
      justify-content: space-between;
      padding: 40px;
    }

    .cart-total-price {
      color: #eabf00;
    }

    .cart-footer {
      display: flex;
      padding: 0px 40px;
    }

    .cart-footer button {
      flex: 1;
      border: none;
      height: 50px;
    }

    .cart-footer button:hover {
      background-color: #eabf00;
      border: solid 1px black;
      cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
      .cart-open {
        width: 100%;
      }

      .cart-open  .cart-btn {
        left: 0px;
      }
    }
  `;
}







