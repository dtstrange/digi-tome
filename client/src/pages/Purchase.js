import React from 'react';
import PurchaseForm from '../components/PurchaseForm';
import PurchaseSuccess from '../components/PurchaseSuccess';
import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from '../components/MyStoreCheckout';

{/* <script src="https://js.stripe.com/v3/"></script> */}

class Purchase extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            formState: "purchaseForm"
        };

        this.changeFormState = this.changeFormState.bind(this);
    }

    changeFormState(event) {
        event.preventDefault()
        if (this.state.formState === "purchaseForm") {
            this.setState({
                formState: "PurchaseSuccess"
            })
        } else {
            this.setState({
                formState: "purchaseForm"
            })
        }
    }
    
    render() {
        return(
            <div style={{width: '100%', height: '90vh'}}>
                {
                (this.state.formState === "purchaseForm")
                ? <PurchaseForm changePurchase={this.changeFormState} /> 
                : <PurchaseSuccess changePurchase={this.changeFormState} />
                }
                {/* <StripeProvider apiKey="pk_test_9WRDeoFwktNtSi5NaHuMGubD">
                    <MyStoreCheckout />
                </StripeProvider> */}
            </div>
      
        )
    }
}

export default Purchase;