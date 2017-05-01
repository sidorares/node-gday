node-gday
=========

[![Greenkeeper badge](https://badges.greenkeeper.io/sidorares/node-gday.svg)](https://greenkeeper.io/)

dns-sd client (Avahi/dbus wrapper)

# install
```sh
  $ npm install gday
```

# example

```js
var dbus = require('dbus-native');
var bus =  dbus.systemBus();
var DnsSD = require('..');

var server = new DnsSD(bus);
server.ServiceBrowserNew(-1, -1, '_rfb._tcp', 'local', 0, function(err, browser) {
      browser.on('ItemNew', function(interface, protocol, name, type, domain, flags) {
                server.ResolveService(interface, protocol, name, type, domain, -1, 0,
                        function(err, interface, protocol, name, type, domain, host, aprotocol, address, port, txt, flags) {
                                      console.log('New item:', interface, protocol, name, type, domain, host, aprotocol, address, port, txt, flags);
                                              });
                    });
          browser.on('ItemRemove', function(interface, protocol, name, type, domain, flags) {
                    console.log('Removed: ' + name);
                        });
});
```

See Avahi documentation for methods & parameters description (TODO: add link)
