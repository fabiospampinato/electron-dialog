
/* IMPORT */

import * as electron from 'electron';

const isRenderer = ( process && process.type === 'renderer' ),
      target = isRenderer ? electron.remote : electron;

/* ELECTRON DIALOG */

const Dialog = {

  options: {
    type: 'none',
    noLink: true
  },

  open ( options, browserWindow?: Electron.BrowserWindow ) {

    if ( !browserWindow && !isRenderer ) throw new Error ( 'You need to provide a BrowserWindow object from the main process' );

    options = Object.assign ( {}, Dialog.options, options );

    return target.dialog.showMessageBox ( browserWindow || electron.remote.getCurrentWindow (), options );

  },

  alert ( message: string, browserWindow?: Electron.BrowserWindow ) {

    return Dialog.open ( {message}, browserWindow );

  },

  confirm ( message: string, browserWindow?: Electron.BrowserWindow ) {

    return !!Dialog.choice ( message, ['Cancel', 'Yes'], browserWindow );

  },

  choice ( message: string, buttons: string[], browserWindow?: Electron.BrowserWindow ) {

    buttons = [...buttons].reverse ();

    const buttonId = Dialog.open ( {message, buttons, defaultId: 0}, browserWindow );

    return buttons.length - buttonId - 1;

  }

};

/* EXPORT */

export default Dialog;
