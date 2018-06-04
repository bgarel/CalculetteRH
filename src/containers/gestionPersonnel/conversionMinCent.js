import React from 'react';

export default class ConversionMinCent extends React.Component {

    render() {
        return (
            <article className="container">
            <h1 className="mt-5">Conversion Minutes / Centième</h1>
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <input type="text" className="form-control form-control-small mr-2" maxLength="2" placeholder="H" id="uiHeures"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="uiMinutes">:</label>
                        <input type="text" className="form-control form-control-small ml-2 mr-2" maxLength="2" placeholder="M" id="uiMinutes" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="uiHeureMinutes">=</label>
                        <input type="text" className="form-control ml-2" id="uiHeureMinutes" placeholder="heures décimales" />
                    </div>
                </form>
        </div>
        </article>
        )
    }
}