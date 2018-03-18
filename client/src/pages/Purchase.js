import React from 'react';
import PurchaseForm from '../components/PurchaseForm';
import PurchaseSuccess from '../components/PurchaseSuccess';


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
            <div>
                {
                (this.state.formState === "purchaseForm")
                ? <PurchaseForm changePurchase={this.changeFormState} /> 
                : <PurchaseSuccess changePurchase={this.changeFormState} />
                }
            </div>
      
        )
    }
}

export default Purchase;