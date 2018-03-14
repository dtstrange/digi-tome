import React from 'react';

class PurchaseForm extends React.Component {
    render() {
        return(
            <div className="cell example example3">
            <form>
              <div className="fieldset">
                <input id="example3-name" data-tid="elements_examples.form.name_label" className="field" type="text" placeholder="Name" required="" />
                <input id="example3-email" data-tid="elements_examples.form.email_label" className="field half-width" type="email" placeholder="Email" required="" />
                <input id="example3-phone" data-tid="elements_examples.form.phone_label" className="field half-width" type="tel" placeholder="Phone" required="" />
              </div>
              <div className="fieldset">
                <div id="example3-card-number" className="field empty"></div>
                <div id="example3-card-expiry" className="field empty third-width"></div>
                <div id="example3-card-cvc" className="field empty third-width"></div>
                <input id="example3-zip" data-tid="elements_examples.form.postal_code_placeholder" className="field empty third-width" placeholder="94107" />
              </div>
              <button type="submit" data-tid="elements_examples.form.pay_button" onClick={this.props.changePurchase}>Pay $25</button>
              <div className="error" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                  <path className="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
                  <path className="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
                </svg>
                <span className="message"></span></div>
            </form>
            </div>
    
        )
    }
}

export default PurchaseForm;