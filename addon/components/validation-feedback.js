import Ember from 'ember';
import layout from '../templates/components/validation-feedback';

const { Component, computed, observer, run } = Ember;

export default Component.extend( {
    layout: layout,
    classNames: [ 'help-block' ],
    tagName: 'span',
    validated: false,
    errors: [],
    errorClass: 'has-error',
    wrapperClass: 'has-feedback',

    errorMessage: computed( 'errors', function(){
        var message = '';
        var errors = this.get( 'errors' );

        if( !Ember.isEmpty( errors ) && Array.isArray( errors ) ){
            errors.forEach( function( value ){
                message += value + '<br>';
            } );
        }

        return message;
    } ),

    validatedDidChange: observer( 'validated', 'errors', function(){
        this._showErrors();
    } ),

    didInsertElement: function(){
        this._super.apply( this, arguments );

        run.scheduleOnce( 'afterRender', this, this._showErrors );
    },

    _showErrors: function(){
        var errors = this.get( 'errors' );
        var errorClass = this.get( 'errorClass' );
        var wrapperClass = this.get( 'wrapperClass' );
        var validated = this.get( 'validated' );
        var wrapper = this.$().parent( '.' + wrapperClass );

        if( !Ember.isEmpty( errors ) && validated ){
            wrapper.addClass( errorClass );
        }
        else{
            wrapper.removeClass( errorClass );
        }
    }
} );
