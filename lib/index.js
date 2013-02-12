var Browser = require('./browser');

function createBrowser(bus, name, callback) {
   return function(err, path) {
      if (err) return callback(err);
      return callback(null, new Browser(bus, path, name));
   }
}

module.exports = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/', 'org.freedesktop.Avahi.Server', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.GetVersionString = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetVersionString',
        }, callback);
    };
    this.GetAPIVersion = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetAPIVersion',
        }, callback);
    };
    this.GetHostName = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetHostName',
        }, callback);
    };
    this.SetHostName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'SetHostName',
            body: [name], 
            signature: 's',
        }, callback);
    };
    this.GetHostNameFqdn = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetHostNameFqdn',
        }, callback);
    };
    this.GetDomainName = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetDomainName',
        }, callback);
    };
    this.IsNSSSupportAvailable = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'IsNSSSupportAvailable',
        }, callback);
    };
    this.GetState = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetState',
        }, callback);
    };
    this.GetLocalServiceCookie = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetLocalServiceCookie',
        }, callback);
    };
    this.GetAlternativeHostName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetAlternativeHostName',
            body: [name], 
            signature: 's',
        }, callback);
    };
    this.GetAlternativeServiceName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetAlternativeServiceName',
            body: [name], 
            signature: 's',
        }, callback);
    };
    this.GetNetworkInterfaceNameByIndex = function(index, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetNetworkInterfaceNameByIndex',
            body: [index], 
            signature: 'i',
        }, callback);
    };
    this.GetNetworkInterfaceIndexByName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetNetworkInterfaceIndexByName',
            body: [name], 
            signature: 's',
        }, callback);
    };
    this.ResolveHostName = function(interface, protocol, name, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ResolveHostName',
            body: [interface, protocol, name, aprotocol, flags], 
            signature: 'iisiu',
        }, callback);
    };
    this.ResolveAddress = function(interface, protocol, address, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ResolveAddress',
            body: [interface, protocol, address, flags], 
            signature: 'iisu',
        }, callback);
    };
    this.ResolveService = function(interface, protocol, name, type, domain, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ResolveService',
            body: [interface, protocol, name, type, domain, aprotocol, flags], 
            signature: 'iisssiu',
        }, callback);
    };
    this.EntryGroupNew = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'EntryGroupNew',
        }, callback);
    };
    this.DomainBrowserNew = function(interface, protocol, domain, btype, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'DomainBrowserNew',
            body: [interface, protocol, domain, btype, flags], 
            signature: 'iisiu',
        }, createBrowser(bus, 'Domain', callback));
    };
    this.ServiceTypeBrowserNew = function(interface, protocol, domain, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ServiceTypeBrowserNew',
            body: [interface, protocol, domain, flags], 
            signature: 'iisu',
        }, createBrowser(bus, 'ServiceType', callback));
    };
    this.ServiceBrowserNew = function(interface, protocol, type, domain, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ServiceBrowserNew',
            body: [interface, protocol, type, domain, flags], 
            signature: 'iissu',
        }, createBrowser(bus, 'Service', callback));
    };
    this.ServiceResolverNew = function(interface, protocol, name, type, domain, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ServiceResolverNew',
            body: [interface, protocol, name, type, domain, aprotocol, flags], 
            signature: 'iisssiu',
        }, callback);
    };
    this.HostNameResolverNew = function(interface, protocol, name, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'HostNameResolverNew',
            body: [interface, protocol, name, aprotocol, flags], 
            signature: 'iisiu',
        }, callback);
    };
    this.AddressResolverNew = function(interface, protocol, address, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'AddressResolverNew',
            body: [interface, protocol, address, flags], 
            signature: 'iisu',
        }, callback);
    };
    this.RecordBrowserNew = function(interface, protocol, name, clazz, type, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'RecordBrowserNew',
            body: [interface, protocol, name, clazz, type, flags], 
            signature: 'iisqqu',
        }, callback);
    };
}
module.exports['org.freedesktop.DBus.Introspectable'] = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/', 'org.freedesktop.DBus.Introspectable', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.Introspect = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.DBus.Introspectable',
            member: 'Introspect',
        }, callback);
    };
}

