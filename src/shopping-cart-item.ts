import { customElement, property, LitElement, html, css } from 'lit-element';

@customElement('shopping-cart-item')
class ShoppingCartItem extends LitElement {

  @property({type: String})
  id: string = '';

  @property({type: String})
  name: string = '';

  @property({type: Number})
  price: number = 0;

  @property({type: Number})
  quantity: number = 0;

  @property({type: String})
  size: string = '';

  @property({type: String})
  img: string = '';

	/** Tells the app element a product should be removed from the cart */
	removeProduct(id: string): void {
		this.dispatchEvent(new CustomEvent('productremoved', { detail: id, composed: true, bubbles: true }));
	}

	render() {
		return html`
			<img alt=${this.name} src=${this.img}></img>
			<div class="product-item-details">
				<h2>${this.name}</h2>
				<span class="product-item-details-quantity">Quantity: ${this.quantity}</span>
				<span class="product-item-details-price">Price: € ${this.price}</span>
			</div>
			<button @click=${() => this.removeProduct(this.id)}>❌</button>
		`;
	}

	static styles = css`
			:host {
				display: flex;
				flex: 1;
				border: solid 1px black;
			}

			img {
				height: 100px;
				margin: 25px;
			}

			.product-item-details {
				display: flex;
				flex: 1;
				justify-content: center;
				flex-direction: column;
			}

			.product-item-details > * {
				margin: 5px 0px;
			}

			.product-item-details-price {
				color: #eabf00;
			}

			.product-item-details-quantity {
				color: #5b5a5e;
			}

			button {
				background-color: transparent;
				border: none;
				width: 75px;
			}

			button:hover {
				background-color: rgba(255, 0, 0, 0.18);
				cursor: pointer;
			}
		`;
}
