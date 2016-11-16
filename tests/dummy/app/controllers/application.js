import Ember from 'ember';

export default Ember.Controller.extend( {
    errors: Ember.computed( 'email', 'validated', function(){
        var errors = [];
        var email = this.get( 'email' );
        if( Ember.isEmpty( email ) ){
            errors.push( 'Must not be blank' );
        }

        if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( email ) ){
            errors.push( 'Must be a valid email' );
        }

        return errors;
    } ),

    validated: false,

    actions: {
        validate: function(){
            this.set( 'validated', true );
        }
    }
} );
