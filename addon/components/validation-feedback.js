import Ember from 'ember';
import layout from '../templates/components/validation-feedback';

const { Component, computed, observer, run: { schedule } } = Ember;

export default Component.extend( {
    layout: layout,
    classNames: [ 'help-block' ],
    tagName: 'span',
    validated: true,
    errors: [],
    displayErrors: false,
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

    validatedWatcher: observer( 'validated', 'errors', function(){
        if( this.get( 'validated' ) ){
            this._showErrors();
        }
    } ),

    didInsertElement: function(){
        this._super.apply( this, arguments );

        schedule( 'sync', this, function(){
            if( this.get( 'validated' ) ){
                this._showErrors();
            }
        } );
    },

    _showErrors: function(){
        var errors = this.get( 'errors' );
        var errorClass = this.get( 'errorClass' );
        var wrapperClass = this.get( 'wrapperClass' );
        var wrapper = this.$().parent( '.' + wrapperClass );

        this.set( 'displayErrors', !Ember.isEmpty( errors ) );

        if( !Ember.isEmpty( errors ) ){
            wrapper.addClass( errorClass );
        }
        else{
            wrapper.removeClass( errorClass );
        }
    }
} );
