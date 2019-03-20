import { html, fixture, expect } from '@open-wc/testing';

import '../src/typescript-app';

describe('<typescript-app>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<typescript-app></typescript-app>');
    expect(el.title).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <typescript-app title="different"></typescript-app>
    `);
    expect(el.title).to.equal('different');
  });
});
