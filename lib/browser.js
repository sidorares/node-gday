module.exports = function(bus, path, ifaceType) {
    var iface = 'org.freedesktop.Avahi.' + ifaceType + 'Browser';
    var self = this;
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle(path, iface, signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
        return self;
    };
    this.Free = function(callback) {
        bus.invoke({
            destination: iface, // destination name same as interface
            path: path,
            interface: iface,
            member: 'Free',
        }, callback);
    };
}
