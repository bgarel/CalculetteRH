import React from 'react';
import {connect} from 'react-redux';
import AncienneteForm from './ancienneteForm';

class Anciennete extends React.Component {

   render() {
       const {isValid, anciennete, ancienneteStr} = this.props;
       return (
        <article className="container mt-3">
        <h1>Calcul de l'ancienneté</h1>
        <div className="mt-5">
            <AncienneteForm />
            {isValid &&
                <blockquote className="mt-3">
                    <p>
                        Ce salarié a <mark>{anciennete.toFixed(2)} an(s)</mark> d'ancienneté, soit {ancienneteStr}.
                    </p>
                </blockquote>
            }
        </div>
        </article>
        );
    };
}

function mapStateToProps(state) {
    return {
        isValid: state.anciennete.isValid,
        anciennete: state.anciennete.anciennete,
        ancienneteStr: state.anciennete.ancienneteStr
    }
}

export default connect(mapStateToProps)(Anciennete);