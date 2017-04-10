import Ember from 'ember';
import layout from '../templates/components/validation-feedback';

const { Component, computed, observer, run } = Ember;

export default Component.extend( {
    layout: layout,
    classNames: [ 'help-block' ],
    tagName: 'span',
    validated: false,
    errors: [],
    errorIndex: null,
    errorClass: 'has-error',
    wrapperClass: 'has-feedback',

    validatedDidChange: observer( 'validated', function(){
        this._showErrors();
    } ),

    errorMessageDidChange: observer( 'errorMessage', function(){
        this._showErrors();
    } ),

    init: function(){
        this._super.apply( this, arguments );

        this.set( 'errorMessage', this.getErrorMessageComputedProperty() );
        run.scheduleOnce( 'afterRender', this, this._showErrors );
    },

    getErrorMessageComputedProperty: function(){
        var errorIndex = this.get( 'errorIndex' );

        var watchIndexes = [
            'errors'
        ];

        if( errorIndex !== null ){
            watchIndexes.push( 'errors.' + errorIndex );
        }

        watchIndexes.push( function(){
            var message = '';
            var errors = this.get( 'errors' );
            var errorIndex = this.get( 'errorIndex' );
            var errorMessages = errors;

            if( errorIndex !== null ){
                errorMessages = errors.get( errorIndex );
            }

            if( !Ember.isEmpty( errorMessages ) && Array.isArray( errorMessages ) ){
                errorMessages.forEach( function( value ){
                    message += value + '<br>';
                } );
            }

            return message;
        } );

        return computed.apply( this, watchIndexes );
    },

    _showErrors: function(){
        var errorMessages = this.get( 'errorMessage' );
        var errorClass = this.get( 'errorClass' );
        var wrapperClass = this.get( 'wrapperClass' );
        var wrapper = this.$().parent( '.' + wrapperClass );

        if( !Ember.isEmpty( errorMessages ) && this.get( 'validated' ) ){
            wrapper.addClass( errorClass );
        }
        else{
            wrapper.removeClass( errorClass );
        }
    }
} );
