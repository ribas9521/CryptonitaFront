import React from 'react'
import { Field } from 'redux-form'

export default props => {
    return(
    <div>
        <h3>Exchange API KEY</h3>
        
        <div className="alert alert-danger" data-tut="reactour_disclaimer">
            As chaves de sua API são armazenadas de forma criptografada
            e ninguém pode acessá-las. Só é possível realizar saques com autorização
            do proprietário da conta da corretora, mas a Cryptonita não requer esse tipo
                        de autorização. Dúvidas e sugestões: <strong>contact@cryptonita.org</strong>
        </div>
        <form className="contactForm" onSubmit={props.handleSubmit(v => props.onSubmit(v))}>
                <div onClick={()=>props.openTutorial()} className="tutorial-opener">
                <i className="fa fa-question-circle" aria-hidden="true">
                </i>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group" >
                        <Field data-tut="reactour_addAlias" id="alias" type="text" name="name" component="input" className="form-control" placeholder="Ex: Connection-1" />
                    </div>
                    <div className="form-group">
                        <Field data-tut="reactour_addApiKey" type="password" name="apiKey" component="input" className="form-control" placeholder="API KEY" />
                    </div>
                    <div className="form-group">
                        <Field data-tut="reactour_addApiSecret" type="password" name="secretKey" component="input" className="form-control" placeholder="API KEY SECRET" />
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-lg-12 text-center">

                    <button data-tut="reactour_submit" type="submit" className="btn modal-btn btn-success" >Save</button>

                </div>
            </div>
        </form>
    </div>
    )
}