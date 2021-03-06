var test = require('tape');
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();

var setup = function(avatars, controls) {
    return proxyquire('../../client/app/playerSync/Service', {
        './Avatars': avatars || defaultAvatars,
        '../FirstPersonControls': controls || defaultControls
    });
};

var defaultAvatars = {
    add: sinon.stub(),
    remove: sinon.stub(),
    move: sinon.stub()
};

var defaultControls = {
    getTransform: sinon.stub().returns('some stuff'),
};

test('PlayerSync::getPlayerTransform gets transform from first person controls', function(t) {
    var playerSync = setup();

    var transform = playerSync.getPlayerTransform();

    t.equals(transform, defaultControls.getTransform(), 'transform is brought from fp controls');
    t.end();
});

test('PlayerSync::otherConnect stores other player by ID', function(t) {
    var playerSync = setup();
    var other = {
        id: 'some id'
    };

    playerSync.otherConnect(other);

    t.equals(playerSync.players[other.id], other, 'other player is stored by ID');
    t.end();
});

test('PlayerSync::otherConnect creates an avatar if it is not a presenter', function(t) {
    var avatars = {
        add: sinon.spy()
    };
    var playerSync = setup(avatars);
    var nonPresenter = {
        id: 'non presenter'
    };
    var presenter = {
        id: 'presenter',
        presenter: true
    };

    playerSync.otherConnect(nonPresenter);
    playerSync.otherConnect(presenter);

    t.equals(avatars.add.callCount, 1, 'avatars.add is called once');
    t.ok(avatars.add.calledWith(nonPresenter), 'avatars.add is called with non presenter');
    t.end();
});

test('PlayerSync::otherDisconnect removes player', function(t) {
    var playerSync = setup();
    var id = 'some id';
    playerSync.players[id] = 'a player';

    playerSync.otherDisconnect(id);

    t.equals(playerSync.players[id], undefined, 'disconnected player is removed');
    t.end();
});

test('PlayerSync::otherDisconnect removes avatar if it is not a presenter', function(t) {
    var avatars = {
        remove: sinon.spy()
    };
    var playerSync = setup(avatars);
    var nonPresenter = {
        id: 'non presenter'
    };
    var presenter = {
        id: 'presenter',
        presenter: true
    };
    playerSync.players[presenter.id] = presenter;
    playerSync.players[nonPresenter.id] = nonPresenter;

    playerSync.otherDisconnect(nonPresenter.id);
    playerSync.otherDisconnect(presenter.id);

    t.equals(avatars.remove.callCount, 1, 'avatars.remove is called once');
    t.ok(avatars.remove.calledWith(nonPresenter), 'avatars.remove is called with non presenter');
    t.end();
});

test('Calling PlayerSync::otherDisconnect before register does nothing', function(t) {
    var avatars = {
        remove: sinon.spy()
    };
    var playerSync = setup(avatars);
    var id = 'some id';

    playerSync.otherDisconnect({id: id});

    t.false(avatars.remove.called, 'avatars.remove is not called');
    t.end();
});

test('PlayerSync::otherChange updates player transform and rotation (even if it is a presenter)', function(t) {
    var playerSync = setup();
    var id = 'some id';
    playerSync.players[id] = {
        id: id,
        presenter: true
    };

    playerSync.otherChange({
        id: id,
        transform: 'new transform',
        rotation: 'new rotation'
    });

    t.equals(playerSync.players[id].transform, 'new transform', 'updated player has new transform');
    t.end();
});

test('PlayerSync::otherChange updates avatar transform if it is not a presenter', function(t) {
    var avatars = {
        move: sinon.spy()
    };
    var playerSync = setup(avatars);
    var nonPresenter = {
        id: 'non presenter'
    };
    var presenter = {
        id: 'presenter',
        presenter: true
    };
    playerSync.players[presenter.id] = presenter;
    playerSync.players[nonPresenter.id] = nonPresenter;

    playerSync.otherChange(nonPresenter);
    playerSync.otherChange(presenter);

    t.equals(avatars.move.callCount, 1, 'avatars.move is called once');
    t.ok(avatars.move.calledWith(nonPresenter), 'avatars.move is called with non presenter');
    t.end();
});

test('Calling PlayerSync::otherChange before register does nothing', function(t) {
    var avatars = {
        move: sinon.spy()
    };
    var playerSync = setup(avatars);
    var id = 'some id';

    playerSync.otherChange({id: id});

    t.false(avatars.move.called, 'avatars.move is not called');
    t.equals(playerSync.players[id], undefined, 'players list is unaltered');
    t.end();
});
