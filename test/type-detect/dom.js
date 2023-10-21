import * as chai from '../../index.js';

function assert (expr, msg) {
  if (!expr) {
    throw new Error(msg || 'Assertion Failed');
  }
}

const type = chai.util.type

function describeIf(condition) {
  return condition ? describe : describe.skip;
}
function itIf(condition) {
  return condition ? it : it.skip;
}
describeIf(typeof window !== 'undefined' && typeof window.document !== 'undefined')('DOM Specific', () => {

  it('window', () => {
    assert(type(window) === 'Window');
  });

  it('document', () => {
    assert(type(document) === 'HTMLDocument');
  });

  it('domparser', () => {
    assert(type(new DOMParser()) === 'DOMParser');
  });

  it('history', () => {
    assert(type(window.history) === 'History');
  });

  it('location', () => {
    assert(type(window.location) === 'Location');
  });

  it('attr', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'foo');
    assert(type(div.getAttributeNode('id')) === 'Attr');
  });

  describe('Events', () => {

    it('event', () => {
      assert(type(document.createEvent('Event')) === 'Event');
    });

    itIf(typeof HashChangeEvent !== 'undefined')('HashChangeEvent', () => {
      assert(type(new HashChangeEvent('')) === 'HashChangeEvent');
    });

  });

  describe('Navigator', () => {

    it('navigator', () => {
      assert(type(window.navigator) === 'Navigator');
    });

    itIf(typeof navigator !== 'undefined' && 'geolocation' in navigator)('geolocation', () => {
      assert(type(navigator.geolocation) === 'Geolocation');
    });

    itIf(typeof navigator !== 'undefined' && 'connection' in navigator)('networkinformation', () => {
      assert(type(navigator.connection) === 'NetworkInformation');
    });

    itIf(typeof navigator !== 'undefined' && 'mediaDevices' in navigator)('mediadevices', () => {
      assert(type(navigator.mediaDevices) === 'MediaDevices');
    });

    itIf(typeof navigator !== 'undefined' && 'mimeTypes' in navigator)('mimetypearray', () => {
      assert(type(navigator.mimeTypes) === 'MimeTypeArray');
    });

    itIf(typeof navigator !== 'undefined' && 'nfc' in navigator)('nfc', () => {
      assert(type(navigator.nfc) === 'NFC');
    });

    itIf(typeof navigator !== 'undefined' && 'permissions' in navigator)('permissions', () => {
      assert(type(navigator.permissions) === 'Permissions');
    });

    itIf(typeof navigator !== 'undefined' && 'plugins' in navigator)('pluginarray', () => {
      assert(type(navigator.plugins) === 'PluginArray');
    });

    itIf(typeof navigator !== 'undefined' && 'plugins' in navigator && navigator.plugins.length)('plugin', () => {
      assert(type(navigator.plugins[0]) === 'Plugin');
    });

    itIf(typeof navigator !== 'undefined' && 'presentation' in navigator)('presentation', () => {
      assert(type(navigator.presentation) === 'Presentation');
    });

    itIf(typeof navigator !== 'undefined' && 'serviceworker' in navigator)('serviceworkercontainer', () => {
      assert(type(navigator.serviceworker) === 'ServiceWorkerContainer');
    });

    itIf(typeof navigator !== 'undefined' && 'services' in navigator)('serviceportcollection', () => {
      assert(type(navigator.services) === 'ServicePortCollection');
    });

    itIf(typeof navigator !== 'undefined' && 'storage' in navigator)('storagemanager', () => {
      assert(type(navigator.storage) === 'StorageManager');
    });

    itIf(typeof navigator !== 'undefined' && 'storageQuota' in navigator)('storagequota', () => {
      assert(type(navigator.storageQuota) === 'StorageQuota');
    });

    itIf(typeof navigator !== 'undefined' && 'usb' in navigator)('usb', () => {
      assert(type(navigator.usb) === 'USB');
    });

  });

  describe('(HTMLElements)', () => {

    it('HTMLAreaElement', () => {
      assert(type(document.createElement('Area')) === 'HTMLAreaElement');
    });

    it('HTMLBRElement', () => {
      assert(type(document.createElement('BR')) === 'HTMLBRElement');
    });

    it('HTMLBaseElement', () => {
      assert(type(document.createElement('Base')) === 'HTMLBaseElement');
    });

    it('HTMLBodyElement', () => {
      assert(type(document.createElement('Body')) === 'HTMLBodyElement');
    });

    it('HTMLButtonElement', () => {
      assert(type(document.createElement('Button')) === 'HTMLButtonElement');
    });

    it('HTMLCanvasElement', () => {
      assert(type(document.createElement('Canvas')) === 'HTMLCanvasElement');
    });

    it('HTMLDListElement', () => {
      assert(type(document.createElement('DL')) === 'HTMLDListElement');
    });

    // not yet supported in Safari
    itIf(typeof HTMLDataListElement === 'function')('HTMLDataListElement', () => {
      assert(type(document.createElement('DataList')) === 'HTMLDataListElement');
    });

    it('HTMLDivElement', () => {
      assert(type(document.createElement('Div')) === 'HTMLDivElement');
    });

    it('HTMLFieldSetElement', () => {
      assert(type(document.createElement('FieldSet')) === 'HTMLFieldSetElement');
    });

    it('HTMLFormElement', () => {
      assert(type(document.createElement('Form')) === 'HTMLFormElement');
    });

    it('HTMLFrameSetElement', () => {
      assert(type(document.createElement('FrameSet')) === 'HTMLFrameSetElement');
    });

    it('HTMLHRElement', () => {
      assert(type(document.createElement('HR')) === 'HTMLHRElement');
    });

    it('HTMLHeadElement', () => {
      assert(type(document.createElement('Head')) === 'HTMLHeadElement');
    });

    it('HTMLHeadingElement', () => {
      assert(type(document.createElement('H1')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H2')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H3')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H4')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H5')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H6')) === 'HTMLHeadingElement');
    });

    it('HTMLHtmlElement', () => {
      assert(type(document.createElement('Html')) === 'HTMLHtmlElement');
    });

    it('HTMLIFrameElement', () => {
      assert(type(document.createElement('IFrame')) === 'HTMLIFrameElement');
    });

    it('HTMLImageElement', () => {
      assert(type(document.createElement('Img')) === 'HTMLImageElement');
    });

    it('HTMLInputElement', () => {
      assert(type(document.createElement('Input')) === 'HTMLInputElement');
    });

    it('HTMLLIElement', () => {
      assert(type(document.createElement('LI')) === 'HTMLLIElement');
    });

    it('HTMLLabelElement', () => {
      assert(type(document.createElement('Label')) === 'HTMLLabelElement');
    });

    it('HTMLLegendElement', () => {
      assert(type(document.createElement('Legend')) === 'HTMLLegendElement');
    });

    it('HTMLLinkElement', () => {
      assert(type(document.createElement('Link')) === 'HTMLLinkElement');
    });

    it('HTMLMapElement', () => {
      assert(type(document.createElement('Map')) === 'HTMLMapElement');
    });

    it('HTMLMetaElement', () => {
      assert(type(document.createElement('Meta')) === 'HTMLMetaElement');
    });

    itIf(typeof HTMLMeterElement !== 'undefined')('HTMLMeterElement', () => {
      assert(type(document.createElement('Meter')) === 'HTMLMeterElement');
    });

    it('HTMLModElement', () => {
      assert(type(document.createElement('Del')) === 'HTMLModElement');
    });

    it('HTMLOListElement', () => {
      assert(type(document.createElement('OL')) === 'HTMLOListElement');
    });

    it('HTMLOptGroupElement', () => {
      assert(type(document.createElement('OptGroup')) === 'HTMLOptGroupElement');
    });

    it('HTMLOptionElement', () => {
      assert(type(document.createElement('Option')) === 'HTMLOptionElement');
    });

    itIf(typeof HTMLOutputElement !== 'undefined')('HTMLOutputElement', () => {
      assert(type(document.createElement('Output')) === 'HTMLOutputElement');
    });

    it('HTMLParagraphElement', () => {
      assert(type(document.createElement('P')) === 'HTMLParagraphElement');
    });

    it('HTMLParamElement', () => {
      assert(type(document.createElement('Param')) === 'HTMLParamElement');
    });

    it('HTMLPreElement', () => {
      assert(type(document.createElement('Pre')) === 'HTMLPreElement');
    });

    itIf(typeof HTMLProgressElement !== 'undefined')('HTMLProgressElement', () => {
      assert(type(document.createElement('Progress')) === 'HTMLProgressElement');
    });

    it('HTMLQuoteElement', () => {
      assert(type(document.createElement('BlockQuote')) === 'HTMLQuoteElement');
      assert(type(document.createElement('Q')) === 'HTMLQuoteElement');
    });

    it('HTMLScriptElement', () => {
      assert(type(document.createElement('Script')) === 'HTMLScriptElement');
    });

    it('HTMLSelectElement', () => {
      assert(type(document.createElement('Select')) === 'HTMLSelectElement');
    });

    it('HTMLSpanElement', () => {
      assert(type(document.createElement('Span')) === 'HTMLSpanElement');
    });

    it('HTMLStyleElement', () => {
      assert(type(document.createElement('Style')) === 'HTMLStyleElement');
    });

    it('HTMLTableCaptionElement', () => {
      assert(type(document.createElement('Caption')) === 'HTMLTableCaptionElement');
    });

    it('HTMLTableCellElement', () => {
      assert(type(document.createElement('TD')) === 'HTMLTableCellElement');
    });

    it('HTMLTableHeaderCellElement', () => {
      assert(type(document.createElement('TH')) === 'HTMLTableCellElement');
    });

    it('HTMLTableColElement', () => {
      assert(type(document.createElement('Col')) === 'HTMLTableColElement');
      assert(type(document.createElement('ColGroup')) === 'HTMLTableColElement');
    });

    it('HTMLTableElement', () => {
      assert(type(document.createElement('Table')) === 'HTMLTableElement');
    });

    it('HTMLTableRowElement', () => {
      assert(type(document.createElement('TR')) === 'HTMLTableRowElement');
    });

    it('HTMLTableSectionElement', () => {
      assert(type(document.createElement('THead')) === 'HTMLTableSectionElement');
      assert(type(document.createElement('TBody')) === 'HTMLTableSectionElement');
      assert(type(document.createElement('TFoot')) === 'HTMLTableSectionElement');
    });

    it('HTMLTextAreaElement', () => {
      assert(type(document.createElement('TextArea')) === 'HTMLTextAreaElement');
    });

    it('HTMLTitleElement', () => {
      assert(type(document.createElement('Title')) === 'HTMLTitleElement');
    });

    it('HTMLUListElement', () => {
      assert(type(document.createElement('UL')) === 'HTMLUListElement');
    });

    it('HTMLUnknownElement', () => {
      assert(type(document.createElement('foobarbaz')) === 'HTMLUnknownElement');
    });

  });

});
