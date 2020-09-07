// import { Injectable, NgZone } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs'

export default {
  // constructor (private router: Router, private ngZone: NgZone) {}

  isLoggedIn () {
    return new Promise(resolve => {
      window.gigya.accounts.getAccountInfo({
        callback: data => {
          resolve(data.status === 'OK');
          console.log('isLoggedIn', data);
        }
      })
    })
  },

  login ({ email, password }) {
    return new Promise(resolve => {
      window.gigya.accounts.login({
        loginID: email,
        password,
        callback: resolve
      })
    });
  },

  register ({ email, password, firstName, lastName, data }) {
    
    return new Promise(resolve => {
      window.gigya.accounts.initRegistration({
        callback: (response) => {
          // @ts-ignore
          window.gigya.accounts.register({
            regToken: response.regToken,
            email,
            password,
            profile: {
              firstName,
              lastName
            },
            data,
            finalizeRegistration: true,
            callback: resolve
          })
        }
      })
    });
  },

  logout () {
    // @ts-ignore
    return new Promise(resolve => {
      window.gigya.accounts.logout({
        callback: resolve
      })
    });
  },

  getProfile () {
    return new Promise(resolve => {
      window.gigya.accounts.getAccountInfo({
        callback: resolve
      })
    });
  },

  resetPassword (params) {
    return new Promise(resolve => {
      window.gigya.accounts.resetPassword({
        ...params,
        callback: resolve
      })
    });
  }
}
