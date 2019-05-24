import React from 'react'
import { Field } from 'redux-form'
import FocusLock from 'react-focus-lock';


export default props => {
    return (
        <div>
            <h3>Exchange API KEY</h3>

            <div className="alert alert-danger" data-tut="reactour_disclaimer">
                Your API key is stored in encrypted form
                 and no one can access it. It's only possible to make withdrawals with authorization
                 of the account owner, but Cryptonita will never ask this
                authorization. Questions and suggestions: <strong>contact@cryptonita.org</strong>
            </div>
            <FocusLock>
                <form className="contactForm" onSubmit={props.handleSubmit(v => props.onSubmit(v))}>
                    <div onClick={() => props.openTutorial()} className="tutorial-opener">
                        <i className="fa fa-question-circle" aria-hidden="true">
                        </i>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group" >
                                <Field autocomplete="testesasdasd" data-tut="reactour_addAlias" id="alias" type="text" name="name" component="input" className="form-control" placeholder="Ex: Connection-1" />
                            </div>
                            <div className="form-group">
                                <Field autocomplete="new-password" data-tut="reactour_addApiKey" type="password" name="apiKey" component="input" className="form-control" placeholder="API KEY" />
                            </div>
                            <div className="form-group">
                                <Field autocomplete="new-password" data-tut="reactour_addApiSecret" type="password" name="secretKey" component="input" className="form-control" placeholder="API KEY SECRET" />
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-lg-12 text-center">

                            <button data-tut="reactour_submit" type="submit" className="btn modal-btn btn-success" >Save</button>

                        </div>
                    </div>
                </form>
            </FocusLock>
        </div>
    )
}